import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;

  &:first-child {
    padding: 0 0 16px;
  }

  &:last-child {
    padding: 16px 0 0;
  }

  & + div {
    border-top: 1px solid var(--gray-light);
  }
`

export const BoxInfoWrapper = styled.div``

export const BoxMessageTitle = styled.div`
  font-family: var(--semiBold);
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 5px;
`

export const BoxMessageDescription = styled.div`
  max-width: 194px;
  font-family: var(--regular);
  font-size: 12px;
  color: var(--gray-light);
`

export const BoxLink = styled.a`
  color: var(--primary);
  font-size: 14px;
  font-family: var(--light);
`
