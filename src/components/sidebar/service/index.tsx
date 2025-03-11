import React from 'react'
import { Container, ServiceButton, ServiceHeader, ServiceTitle } from './styles'

interface IconTypeProps {
  width?: number
  height?: number
  color?: string
}

type IconType = (props: IconTypeProps) => JSX.Element

interface Props {
  title: string
  Icon: IconType
  handleOption: () => void
  opened: boolean
}

export const Service: React.FC<Props> = ({
  opened,
  Icon,
  title,
  handleOption,
}) => {
  return (
    <Container onClick={handleOption}>
      <ServiceHeader>
        <ServiceTitle>{title}</ServiceTitle>
        <ServiceButton opened={opened}>
          <Icon color="var(--primary)" />
        </ServiceButton>
      </ServiceHeader>
    </Container>
  )
}
