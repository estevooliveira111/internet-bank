import React from 'react'
import { Container, IconWrapper } from './styles'
import { ArrowIcon } from '../../icons/arrow'
import { RefreshIcon } from '../../icons/refresh'

interface Props {
  selected: boolean
  name: string
  id: string
  handleFunction?: () => void
}

export const ClientInfoAccount: React.FC<Props> = ({
  selected,
  name,
  id,
  handleFunction,
}) => {
  return (
    <Container onClick={handleFunction} selected={selected}>
      <div>
        <strong>{name}</strong>
        <p>{id}</p>
      </div>
      <IconWrapper>
        {selected ? (
          <ArrowIcon color="var(--primary)" />
        ) : (
          <RefreshIcon color="var(--gray)" />
        )}
      </IconWrapper>
    </Container>
  )
}
