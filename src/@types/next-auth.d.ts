/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    activeSubscription: string
    user: {} & DefaultSession['user']
  }
}
