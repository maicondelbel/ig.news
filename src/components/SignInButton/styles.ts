import styled from 'styled-components'

export const SignInButtonContainer = styled.button`
  background: ${(props) => props.theme['--gray-800']};
  color: ${(props) => props.theme['--gray-100']};
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  line-height: 0;
  border-radius: 56px;
  font-weight: bold;
  transition: filter 0.1s;
  width: 12.75rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    filter: brightness(1.2);
  }
`
