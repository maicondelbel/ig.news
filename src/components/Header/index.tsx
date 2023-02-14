import Link from 'next/link'
import {
  HeaderCloseMenuMobile,
  HeaderContainer,
  HeaderInnerContainer,
  HeaderMenuMobile,
  HeaderNavBar,
  HeaderNavBarItemLink,
  HeaderOpenMenuMobile,
  HeaderWrapperMobileButton,
} from './styles'
import { useRouter } from 'next/router'
import { AnchorHTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { SignInButton } from '../SignInButton'

interface INavBarItem extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  href: string
}

function NavBarItem({ href, children, ...props }: INavBarItem) {
  return (
    <Link href={href} passHref legacyBehavior>
      <HeaderNavBarItemLink {...props}>{children}</HeaderNavBarItemLink>
    </Link>
  )
}

export function Header() {
  const { pathname, asPath } = useRouter()
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false)

  useEffect(() => {
    setIsMenuMobileOpen(false)
  }, [asPath])

  function handleToggleMenuMobile() {
    setIsMenuMobileOpen(!isMenuMobileOpen)
  }

  return (
    <>
      <HeaderContainer>
        <HeaderInnerContainer>
          <Link href={'/'}>
            <img src="/logo.svg" alt="Logo ig.news" />
          </Link>
          <HeaderNavBar>
            <NavBarItem href={'/'} className={pathname === '/' && 'active'}>
              Home
            </NavBarItem>
            <NavBarItem
              href={'/posts'}
              className={pathname.includes('/posts') && 'active'}
            >
              Posts
            </NavBarItem>
          </HeaderNavBar>
          <SignInButton />
          <HeaderWrapperMobileButton>
            <HeaderOpenMenuMobile onClick={handleToggleMenuMobile}>
              <img src="/open-menu.svg" alt="" />
            </HeaderOpenMenuMobile>
          </HeaderWrapperMobileButton>
        </HeaderInnerContainer>
      </HeaderContainer>
      <HeaderMenuMobile isOpen={isMenuMobileOpen}>
        <HeaderCloseMenuMobile onClick={handleToggleMenuMobile}>
          <img src="/close-menu.svg" alt="" />
        </HeaderCloseMenuMobile>
        <HeaderNavBar>
          <NavBarItem href={'/'} className={pathname === '/' && 'active'}>
            Home
          </NavBarItem>
          <NavBarItem
            href={'/posts'}
            className={pathname.includes('/posts') && 'active'}
          >
            Posts
          </NavBarItem>
        </HeaderNavBar>
        <SignInButton />
      </HeaderMenuMobile>
    </>
  )
}
