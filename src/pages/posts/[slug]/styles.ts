import styled from 'styled-components'

export const SpecificPostsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const SpecificPostsInnerContainer = styled.div`
  max-width: 45.5rem;
  margin: 5rem auto;

  h1 {
    font-size: 3.375rem;
    line-height: 3.75rem;
    margin-bottom: 1.5rem;
  }

  time {
    display: block;
  }
`
export const SpecificPostsContent = styled.div`
  margin-top: 1.5rem;

  p {
    margin-bottom: 1.125rem;
    font-size: 1.125rem;
    color: ${(props) => props.theme['--gray-100']};
  }
`
