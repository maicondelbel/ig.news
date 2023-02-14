import styled from 'styled-components'

export const PostsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const PostsInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;

  article + article {
    border-top: 1px solid ${(props) => props.theme['--gray-500']};
    padding-top: 2rem;
  }
`
