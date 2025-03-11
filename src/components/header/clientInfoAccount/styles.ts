import styled from 'styled-components'

interface NotificationsProps {
  selected: boolean
}

export const Container = styled.button<NotificationsProps>`
  width: 100%;
  background: none;
  border-style: none;
  padding: 10px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-bottom: 0;

  > div {
    > span {
      font-size: 12px;
      color: ${(props) =>
        props.selected ? 'var(--text-primary)' : 'var(--gray)'};
      font-family: var(--semiBold);
    }
    > p {
      font-size: 16px;
      color: ${(props) =>
        props.selected ? 'var(--text-primary)' : 'var(--gray)'};
      font-family: var(--light);
      margin-top: 5px;
    }
  }

  > button {
    background: none;
    border-style: none;
  }

  @media (min-width: 1000px) {
    > div {
      > strong {
        font-size: 14px;
        color: var(--text-primary);
        font-family: var(--regular);
      }
      > p {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }

  @media (min-width: 1280px) {
    > div {
      > span {
        font-size: 16px;
        font-family: var(--semiBold);
      }
      > p {
        font-size: 16px;
        font-family: var(--light);
        margin-top: 5px;
      }
    }
  }
`

export const IconWrapper = styled.div``
