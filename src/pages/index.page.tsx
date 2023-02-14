import { GetStaticProps } from 'next'
import Head from 'next/head'
import { stripe } from './../services/stripe'
import { signIn, useSession } from 'next-auth/react'
import { api } from './../services/api'

import {
  HomeContainer,
  HomeHightLight,
  HomeInnerContainer,
  HomeInnerLeftSide,
  HomeInnerRightSide,
  HomeSubscribeButton,
} from './styles/home'
import { getStripeJs } from '../services/stripe-client'
import { useRouter } from 'next/router'

interface IProduct {
  priceId: string
  amount: number
}

interface IHomeProps {
  product: IProduct
}

export default function Home({ product }: IHomeProps) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }
    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert('Error trying to subscribe!')
      console.log(error)
    }
  }
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>

      <HomeContainer>
        <HomeInnerContainer>
          <HomeInnerLeftSide>
            <span>👏 Hey, welcome</span>
            <div>
              <h1>
                News about <br />
                the <HomeHightLight>React</HomeHightLight> world
              </h1>
              <p>
                Get access to all the publications <br />
                <HomeHightLight>for {product.amount} month</HomeHightLight>
              </p>
            </div>
            <HomeSubscribeButton onClick={handleSubscribe}>
              Subscribe now
            </HomeSubscribeButton>
          </HomeInnerLeftSide>
          <HomeInnerRightSide>
            <img src="/home-illustration.svg" alt="" />
          </HomeInnerRightSide>
        </HomeInnerContainer>
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Mb1ZPCT8V29EbU7GGKpqfyk')

  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price.unit_amount / 100)

  const product = {
    priceId: price.id,
    amount,
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
