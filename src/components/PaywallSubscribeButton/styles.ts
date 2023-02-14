import styled from 'styled-components'

export const PaywallButton = styled.div`
  background-color: ${(props) => props.theme['--gray-800']};
  padding: 1.875rem 2rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 999px;
  font-size: 1.125rem;
  transition: filter 0.1s;

  &:hover {
    filter: brightness(1.2);
  }

  span {
    color: ${(props) => props.theme['--yellow-500']};
    margin-bottom: 0;
  }
`
export const PaywallButtonHighlight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
