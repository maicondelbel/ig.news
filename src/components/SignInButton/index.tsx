import { SignInButtonContainer } from './styles'
import { useSession, signIn, signOut } from 'next-auth/react'

export function SignInButton() {
  const { data: session, status } = useSession()

  return (
    <>
      {session ? (
        <SignInButtonContainer
          onClick={() => signOut()}
          disabled={status === 'loading'}
        >
          {session.activeSubscription === 'active' ? (
            <img src="/github-sign-in.svg" alt="GitHub logo" />
          ) : (
            <img
              src="/github-subscribe-canceled.svg"
              alt="close image"
              title="Your subscription is canceled!"
            />
          )}
          {session.user?.name}
          <img src="/close.svg" alt="Sign out" />
        </SignInButtonContainer>
      ) : (
        <SignInButtonContainer
          onClick={() => signIn('github')}
          disabled={status === 'loading'}
        >
          <img src="/github-sign-out.svg" alt="GitHub logo" />
          Sign in with GitHub
        </SignInButtonContainer>
      )}
    </>
  )
}
