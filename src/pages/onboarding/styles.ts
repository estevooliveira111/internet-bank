import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Button = styled(Link)`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  text-decoration: none;
  color: var(--white);

  > span {
    font-family: var(--multi-bold);
    color: var(--white);
    font-size: 16px;
    font-weight: var(--extraBold);
  }
`
