import styled, { css } from 'styled-components'

type optionSidebarProps = {
  selected?: boolean
}

export const Container = styled.div<optionSidebarProps>`
  ${(props) =>
    props.selected &&
    css`
      &::before {
        content: '';
        height: 16px;
        width: 4px;
        background-color: var(--primary);
        position: absolute;
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
      }
    `}

  height: 24px;
  position: relative;

  > button {
    text-decoration: none;
    padding: 0 24px;
    display: flex;
    background: none;
    border-style: none;
    cursor: pointer;
    width: 100%;

    > span {
      color: ${(props) => (props.selected ? 'var(--primary)' : 'var(--white)')};
      font-size: 16px;
      font-weight: 100;
      font-family: var(--light);
    }

    > div {
      > svg {
        ${(props) =>
          props.selected &&
          css`
            fill: var(--primary);
          `}
      }
    }
  }

  & + div {
    margin-top: 22px;
  }
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 24px;
`
