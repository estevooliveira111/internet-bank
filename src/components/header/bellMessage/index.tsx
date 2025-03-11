import React from 'react'
import {
  BoxInfoWrapper,
  BoxMessageTitle,
  BoxMessageDescription,
  BoxLink,
  Container,
} from './styles'

interface Props {
  title: string
  desc: string
  link: string
}

export const BellMessage: React.FC<Props> = ({ link, title, desc }) => {
  return (
    <Container>
      <BoxInfoWrapper>
        <BoxMessageTitle>{title}</BoxMessageTitle>
        <BoxMessageDescription>{desc}</BoxMessageDescription>
      </BoxInfoWrapper>
      <BoxLink href={link}>Ver</BoxLink>
    </Container>
  )
}
