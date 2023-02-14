import styled from 'styled-components'

export const PostsItems = styled.article`
  max-width: 45.5rem;
  margin-bottom: 2rem;

  &:hover {
    h2 {
      color: ${(props) => props.theme['--yellow-500']};
    }
  }

  time {
    margin-bottom: 1rem;
    display: block;
  }

  h2 {
    margin-bottom: 0.25rem;
  }
`
