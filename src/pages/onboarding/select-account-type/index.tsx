import React from 'react'

import {
  Container,
  ContentWrapper,
  GoBackButtonWrapper,
  Requirement,
  Text,
  Title,
  WrapperContent,
  WrapperLeft,
  WrapperRight,
  ListWrapper,
  WrapperButton,
  Line,
} from './styles'

import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { useCustomer } from '../../../hooks/customer'
import { Button } from '../styles'
import SignInImageDefault from '../../../assets/sign-in.png'
import SignInImageVF from '../../../assets/vfbank-login.jpeg'

const CreateAccountType: React.FC = () => {
  const { customer } = useCustomer()
  const navigation = useNavigate()
  const handleGoBack = () => {
    navigation('/u')
  }

  return (
    <Container>
      <ContentWrapper>
        <WrapperLeft
          image={
            customer?.display_name === 'VF BANK DIGITAL'
              ? SignInImageVF
              : SignInImageDefault
          }
        ></WrapperLeft>
        <WrapperRight>
          <GoBackButtonWrapper onClick={handleGoBack}>
            <ArrowLeftIcon color="var(--primary)" />
          </GoBackButtonWrapper>
          <WrapperContent>
            <img
              src={customer.logo.dark}
              alt={customer.name}
              style={{
                maxWidth: '120px',
                marginBottom: '15px',
              }}
            />
            <Title>
              Pronto para ter uma <strong>Conta {customer.display_name}</strong>
              ?
            </Title>
            <Line />
            <Text>
              Antes de seguir selecione o tipo de conta que deseja abrir
            </Text>
            <ListWrapper>
              {customer?.display_name !== 'VF BANK DIGITAL' && (
                <Requirement>
                  <Button to="/u/requirements-create-account/pf">
                    Sou Pessoa Física
                  </Button>
                </Requirement>
              )}
              <Requirement>
                <Button to="/u/requirements-create-account/pj">
                  Sou Pessoa Júridica
                </Button>
              </Requirement>
            </ListWrapper>
            <WrapperButton></WrapperButton>
          </WrapperContent>
        </WrapperRight>
      </ContentWrapper>
    </Container>
  )
}

export default CreateAccountType
