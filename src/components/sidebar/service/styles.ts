import styled from 'styled-components'

type Props = {
  opened?: boolean
}

export const Container = styled.button`
  padding: 0 24px;
  background: none;
  border-style: none;
  cursor: pointer;
  width: 100%;
  margin-top: 22px;
`

export const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ServiceTitle = styled.p`
  font-size: 16px;
  color: var(--white);
  font-family: var(--bold);
`

export const ServiceButton = styled.div<Props>`
  background: none;
  outline: 0;
  border-style: none;
  cursor: pointer;

  transform: ${(props) => (props.opened ? 'rotate(-180deg)' : 'rotate(0)')};
  transition: all 0.2s;
  // transform: rotate(180deg);
`
