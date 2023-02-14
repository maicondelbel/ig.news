import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth/next'
import { stripe } from './../../services/stripe'
import { query as q } from 'faunadb'
import { faunaDB } from './../../services/faunadb'

interface IFaunaDBUser {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getServerSession(request, response, authOptions)

    // Busca pelo usuário através do email no FaunaDB
    const user = await faunaDB.query<IFaunaDBUser>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email))),
    )

    // Checa se o usuário já possui um stripe_customer_id cadastrado
    let customerId = user.data.stripe_customer_id
    // Caso não, criar no stripe um novo customer e adiciona no FaunaDB o customer_id
    if (!customerId) {
      const customerInStripe = await stripe.customers.create({
        email: session.user.email,
        // metadata:
      })

      await faunaDB.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripe_customer_id: customerInStripe.id,
          },
        }),
      )

      customerId = customerInStripe.id
    }

    const checkoutSessionInStripe = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: 'price_1Mb1ZPCT8V29EbU7GGKpqfyk', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return response.status(200).json({ sessionId: checkoutSessionInStripe.id })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not allowed!')
  }
}
