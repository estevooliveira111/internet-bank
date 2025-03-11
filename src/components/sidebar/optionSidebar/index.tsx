import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container, IconWrapper } from './styles'

type props = {
  title: string
  Icon: ReactNode
  selected?: boolean
  linkTo?: string
}

export const OptionSidebar: React.FC<props> = ({
  Icon,
  linkTo,
  title,
  selected,
}) => {
  return (
    <Container selected={selected}>
      <Link to={linkTo || ''}>
        <IconWrapper>{Icon}</IconWrapper>
        <span>{title}</span>
      </Link>
    </Container>
  )
}
