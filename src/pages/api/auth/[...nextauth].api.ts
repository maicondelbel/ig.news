import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { query as q } from 'faunadb'
import { faunaDB } from './../../../services/faunadb'

interface IUserActiveSubscriptionProps {
  data: {
    id: string
    userId: string
    status: 'active' | 'canceled'
    price: string
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      try {
        const userActiveSubscription =
          await faunaDB.query<IUserActiveSubscriptionProps>(
            q.Get(
              q.Intersection([
                q.Match(
                  q.Index('subscription_by_user_ref'),
                  q.Select(
                    'ref',
                    q.Get(
                      q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(session.user.email),
                      ),
                    ),
                  ),
                ),
                q.Match(q.Index('subscription_by_status'), 'active'),
              ]),
            ),
          )

        return {
          ...session,
          activeSubscription: userActiveSubscription.data.status,
        }
      } catch {
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
    async signIn({ user, account }) {
      const { email } = user

      try {
        await faunaDB.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email))),
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email))),
          ),
        )

        return true
      } catch {
        return false
      }
    },
  },
}

export default NextAuth(authOptions)
