import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'content';
  background-color: var(--background);

  @media (min-width: 720px) {
    grid-template-columns: 256px 1fr;
    grid-template-areas: 'sidebar content';
  }
`

export const Content = styled.div`
  grid-area: content;
  overflow-x: hidden;
`
