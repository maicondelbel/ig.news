import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header`
  border-bottom: 1px solid ${(props) => props.theme['--gray-500']};
  position: sticky;
  top: 0;
  z-index: 99999;
  background-color: ${(props) => props.theme['--gray-900']};
  max-height: 5rem;
  padding-left: calc(100vw - 100%);
`

export const HeaderInnerContainer = styled.div`
  @media (max-width: 768px) {
    nav,
    > button {
      display: none;
    }
  }

  width: 100%;
  max-width: 1120px;
  height: 5rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-left: auto;
  }
`

export const HeaderWrapperMobileButton = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderNavBar = styled.nav`
  padding-left: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`
export const HeaderNavBarItemLink = styled.a`
  line-height: 5rem;
  width: 3.75rem;
  position: relative;
  text-align: center;
  transition: filter 0.1s;

  &:not(.active):hover {
    filter: brightness(1.2);
  }

  &.active {
    font-weight: bold;
    color: ${(props) => props.theme['--gray-100']};
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background-color: ${(props) => props.theme['--yellow-500']};
    border-radius: 10px 10px 0 0;
  }
`

interface IHeaderMenuMobileProps {
  isOpen: boolean
}

export const HeaderMenuMobile = styled.div<IHeaderMenuMobileProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 95vw;
  background: #121414e6;
  z-index: 99999;
  backdrop-filter: blur(1rem);
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all ease 0.5s;
  border-right: 1px solid ${(props) => props.theme['--gray-500']};
  transform: translateX(-100%);

  ${(props) =>
    props.isOpen &&
    css`
      transform: translateX(0);
    `}

  nav {
    flex-direction: column;
    padding: 0;
    height: auto;

    a {
      font-size: 2.5rem;
      width: 100%;
    }
  }
`
export const HeaderCloseMenuMobile = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  top: 1rem;
  right: 1.5rem;

  img {
    height: 2rem;
    width: 2rem;
  }
`
export const HeaderOpenMenuMobile = styled.button`
  @media (max-width: 768px) {
    & {
      display: flex;
    }
  }

  margin-right: -0.5rem;
  height: 1.625rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  display: none;
`
