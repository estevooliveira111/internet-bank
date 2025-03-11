import styled, { css } from 'styled-components'

import SignInImage from '../../../assets/sign-in.png'
import { WrapperBackgroundProps } from '@/pages/sign-in/styles'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  display: flex;
`

export const WrapperLeft = styled.div<WrapperBackgroundProps>`
  flex: 1;
  min-height: 100vh;
  display: none;

  @media (min-width: 840px) {
    background-image: url(${SignInImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: unset;

    ${({ image }) =>
      image &&
      css`
        background-image: url(${image});
      `}
  }
`

export const WrapperRight = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const GoBackButtonWrapper = styled.button`
  font-size: 14px;
  color: var(--gray);
  text-decoration: underline;
  cursor: pointer;
  background-color: transparent;
  border-style: none;
  text-align: start;

  > svg {
    margin-right: 12px;
  }
`

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 488px;
  flex: 1;
  margin: 0 auto;

  > svg {
    margin-bottom: 63px;
  }
`

export const Title = styled.span`
  font-size: 42px;
  color: var(--text-primary);
  font-weight: var(--light);
  max-width: 384px;
  line-height: 52px;
  margin-bottom: 15px;
  margin-top: 15px;

  > strong {
    font-weight: var(--bold);
  }
`

export const Text = styled.span`
  font-size: 16px;
  color: var(--text-secondary);
  font-family: var(--regular);
  max-width: 384px;
  line-height: 28px;
  display: none;

  @media (min-width: 840px) {
    display: unset;
  }
`

export const TextRequirement = styled.strong`
  text-transform: uppercase;
  color: var(--gray);
  font-size: 16px;
`

export const ListWrapper = styled.div`
  margin-bottom: 63px;
  margin-top: 44px;
`

export const Subtitle = styled.div`
  font-size: 16px;
  font-weight: var(--bold);
  color: var(--white);
  position: relative;
  text-align: center;

  @media (min-width: 1120px) {
    text-align: start;
  }
`

export const Line = styled.div`
  width: 42px;
  height: 4px;
  background: var(--primary);
  margin: 0px 12px 0px 0px;
  margin-bottom: 15px;

  @media (min-width: 1120px) {
    flex-direction: row;
    align-items: center;
  }
`

export const Requirement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 0px 14px 0px;
`

export const WrapperButton = styled.div`
  width: 100%;
  @media (min-width: 840px) {
    max-width: 176px;
  }
`
