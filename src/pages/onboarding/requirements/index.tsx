import React from 'react'

import {
  Container,
  ContentWrapper,
  GoBackButtonWrapper,
  Line,
  Requirement,
  Text,
  TextRequirement,
  Title,
  WrapperContent,
  WrapperLeft,
  WrapperRight,
  ListWrapper,
  WrapperButton,
} from './styles'

import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { useCustomer } from '../../../hooks/customer'
import { Button } from '../styles'
import SignInImageDefault from '../../../assets/sign-in.png'
import SignInImageVF from '../../../assets/vfbank-login.jpeg'

const Requirements: React.FC = () => {
  const { customer } = useCustomer()
  const navigation = useNavigate()
  const params = useParams()

  const handleGoBack = () => {
    navigation('/u/account-type')
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
                maxWidth: customer.name === 'Banorb' ? '200px' : '120px',
                marginBottom: '15px',
              }}
            />
            <Title>
              Pronto para ter uma <strong>Conta {customer.display_name}</strong>
              ?
            </Title>
            <Text>
              Antes de seguir confira os documentos que iremos solicitar nas
              próximas etapas
            </Text>
            {params.type === 'pf' && (
              <ListWrapper>
                <Requirement>
                  <Line />
                  <TextRequirement>
                    CPF válido na Receita Federal
                  </TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>FOTO do titular</TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>
                    Carteira de habilitação <br />
                    ou identidade (CNH ou RG)
                  </TextRequirement>
                </Requirement>
              </ListWrapper>
            )}

            {params.type === 'pj' && (
              <ListWrapper>
                <Requirement>
                  <Line />
                  <TextRequirement>
                    CNPJ válido na Receita Federal
                  </TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>Documento contratual</TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>Comprovante de endereço</TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>Cartão CNPJ</TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>FOTO do representante legal</TextRequirement>
                </Requirement>
                <Requirement>
                  <Line />
                  <TextRequirement>
                    Documentos dos representantes legais <br />
                  </TextRequirement>
                </Requirement>
              </ListWrapper>
            )}
            <WrapperButton>
              <Button to={`/u/create-account/${params.type}`}>Começar</Button>
            </WrapperButton>
          </WrapperContent>
        </WrapperRight>
      </ContentWrapper>
    </Container>
  )
}

export default Requirements
