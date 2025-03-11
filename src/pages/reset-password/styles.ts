import styled from 'styled-components'
import SignInImage from '../../assets/sign-in.png'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: var(--brand-background);
  height: 100vh;
  display: flex;
`

export const WrapperBackground = styled.div`
  background: url(${SignInImage}) no-repeat;
  background-size: cover;
  height: 100%;
  flex: 1;
  display: none;

  @media (min-width: 720px) {
    display: block;
  }
`

export const WrapperContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`

export const Content = styled.div`
  height: 100%;
  max-width: 384px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`

export const Title = styled.h3`
  margin-top: 32px;
  font-size: 24px;
  color: var(--white);
  font-family: var(--regular);

  > b {
    font-family: var(--semiBold);
  }

  @media (min-width: 1280px) {
    font-size: 33px;
  }
`

export const Separator = styled.div`
  margin-top: 25px;
  width: 42px;
  height: 4px;
  background: var(--primary);
`

export const Reference = styled.span`
  margin-top: 18px;
  font-size: 16px;
  color: var(--white);
  font-family: var(--regular);
`

export const WrapperLogo = styled.div`
  width: 100%;
`

export const WrapperForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 42px;
`

export const Input = styled.label`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray-light);
  border-radius: 4px;
  height: 66px;
  width: 100%;
  padding: 10px 11px;

  & + div {
    margin-top: 24px;
  }

  > span {
    flex: 1;
    color: var(--white);
    font-family: var(--regular);
    font-size: 14px;
  }

  > input {
    border-style: none;
    flex: 1;
    background: transparent;
    color: var(--white);
    font-family: var(--semiBold);
    outline: 0;

    &::placeholder {
      color: var(--white);
      opacity: 1;
      font-family: var(--semiBold);
      font-size: 14px;
    }
  }
`

export const ButtonEyeVisibility = styled.button`
  background: none;
  border-style: none;
  cursor: pointer;
`

export const InputPassword = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gray-light);
  border-radius: 4px;
  height: 66px;
  width: 100%;
  padding: 10px 11px;

  & + label {
    margin-top: 24px;
  }

  > label {
    flex: 1;
    display: flex;
    flex-direction: column;
    > span {
      flex: 1;
      color: var(--white);
      font-family: var(--regular);
      font-size: 14px;
    }

    > input {
      border-style: none;
      flex: 1;
      background: transparent;
      color: var(--white);
      font-family: var(--semiBold);
      outline: 0;

      &::placeholder {
        color: var(--white);
        opacity: 1;
        font-family: var(--semiBold);
        font-size: 14px;
      }
    }
  }
`

export const ForgetPassword = styled(Link)`
  color: var(--white);
  font-family: var(--semiBold);
  font-size: 16px;
  align-self: center;
  margin-top: 22px;
`

export const Line = styled.div`
  background-color: var(--gray);
  width: 100%;
  height: 1px;
  margin: 30px 0;
`

export const NotHaveAnAccount = styled(Link)`
  align-self: center;
  color: var(--white);
  font-family: var(--bold);
  font-size: 16px;
`

export const ButtonSignIn = styled.button`
  margin-top: 24px;
  background-color: var(--primary);
  height: 56px;
  width: 100%;
  color: var(--white);
  font-family: var(--semiBold);
  border-style: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4;
`
