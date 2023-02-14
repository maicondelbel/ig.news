import Stripe from 'stripe'
import appDetails from '../../package.json'

export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'ig.news',
    version: appDetails.version,
  },
})
