import styled from 'styled-components'

export const HomeContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  min-height: calc(100vh - 5rem);
  padding: 0 2rem;
  display: flex;
  align-items: center;
`

export const HomeInnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5rem 0;
`

export const HomeInnerLeftSide = styled.div`
  display: flex;
  flex: 1 50%;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;

  > span {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${(props) => props.theme['--gray-100']};
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
`

export const HomeInnerRightSide = styled.div`
  @media (max-width: 768px) {
    & {
      display: none;
    }
  }

  display: flex;
  flex: 1 50%;
  align-items: center;
  justify-content: center;

  img {
    padding: 0 3rem;
    max-height: 521px;
    width: 100%;
    height: auto;
  }
`

export const HomeHightLight = styled.span`
  color: ${(props) => props.theme['--blue-500']};
`

export const HomeSubscribeButton = styled.button`
  color: ${(props) => props.theme['--black-700']};
  background-color: ${(props) => props.theme['--yellow-500']};
  padding: 1.25rem 4rem;
  font-weight: bold;
  font-size: 1.25rem;
  border-radius: 80px;
  transition: filter 0.1s;

  &:hover {
    filter: brightness(1.2);
  }
`
