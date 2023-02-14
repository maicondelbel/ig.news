import Link from 'next/link'
import { PaywallButton, PaywallButtonHighlight } from './styles'

export function PaywallSubscribeButton() {
  return (
    <Link href={'/'}>
      <PaywallButton>
        Wanna continue reading?
        <PaywallButtonHighlight>
          <span> Subscribe now</span>
          <img src="/paywall-icon.svg" alt="" />
        </PaywallButtonHighlight>
      </PaywallButton>
    </Link>
  )
}
