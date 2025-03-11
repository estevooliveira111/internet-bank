import React from 'react'
import { Container, IconWrapper } from './styles'

interface IconTypeProps {
  width?: number
  height?: number
  color?: string
}

type IconType = (props: IconTypeProps) => JSX.Element

type props = {
  title: string
  Icon: IconType
  selected?: boolean
  handleFuction?: () => void
}

export const OptionSidebarButton: React.FC<props> = ({
  Icon,
  title,
  selected,
  handleFuction,
}) => {
  return (
    <Container selected={selected}>
      <button onClick={handleFuction}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <span>{title}</span>
      </button>
    </Container>
  )
}
