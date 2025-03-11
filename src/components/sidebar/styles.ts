import styled, { css } from 'styled-components'

import { motion } from 'framer-motion'
import { LogoIcon } from '../icons/logo'
import { ArrowIcon as ArrowIconSVG } from '../icons/arrow'

interface PropsArrowIcon {
  bankServicesopened?: boolean
}

interface SidebarContainerProps {
  isactive: boolean
}

export const StricLogo = styled(LogoIcon)`
  margin-left: 24px;
`

export const Arrowicon = styled(ArrowIconSVG)<PropsArrowIcon>`
  transform: ${(props) =>
    props.bankServicesopened ? 'rotate(0)' : 'rotate(180deg)'};
`

type optionSidebarProps = {
  selected: boolean
}

export const Container = styled.div<SidebarContainerProps>`
  grid-area: sidebar;
  background-color: var(--brand-background);
  height: 100%;
  width: 256px;
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-y: scroll;
  transition: all 0.2s;

  @media (max-width: 720px) {
    ${(props) =>
      props.isactive
        ? css`
            left: 0;
          `
        : css`
            left: -256px;
          `};
  }

  @media (min-width: 720px) {
    display: block;
  }

  ::-webkit-scrollbar {
    visibility: hidden;
    display: none;
  } /* Chorme, Safari */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

export const WrapperHeader = styled.div`
  background-color: var(--dark);

  height: 80px;
  display: flex;
  align-items: center;
  padding: 38px 24px;
`

export const SideFix = styled.div`
  padding: 22px 0px 0;
  display: flex;
  flex-direction: column;
`
export const OptionsWrapper = styled(motion.div).attrs({
  initial: { opacity: 0, y: '-10%' },
  animate: { opacity: 1, y: '0' },
  exit: { opacity: 0, y: '-10%' },
  ransition: { type: 'just', duration: 1 },
})`
  padding: 22px 0 0;
`

export const OptionSidebarFix = styled.div<optionSidebarProps>`
  ${(props) =>
    props.selected &&
    css`
      &::before {
        content: '';
        height: 16px;
        width: 4px;
        background-color: var(--primary);
        position: absolute;
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
      }
    `}

  height: 24px;
  position: relative;

  > a {
    text-decoration: none;
    padding: 0 24px;
    display: flex;
    background: none;
    border-style: none;
    cursor: pointer;
    width: 100%;

    > span {
      color: ${(props) => (props.selected ? 'var(--primary)' : 'var(--white)')};
      font-size: 16px;
      font-weight: 100;
      font-family: var(--light);
    }

    > div {
      > svg {
        ${(props) =>
          props.selected &&
          css`
            fill: var(--primary);
          `}
      }
    }
  }

  & + div {
    margin-top: 22px;
  }
`

export const NotificationWrapper = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--red);

  position: absolute;
  right: 24px;
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;

  > span {
    font-size: 12px;
    font-family: var(--regular);
    color: var(--white);
  }
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 24px;
`

export const Icon = styled.img`
  width: 16px;
`

export const InfoAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 96px;
  padding: 24px;
  border-bottom: 2px solid var(--line);

  > p {
    font-size: 16px;
    color: var(--primary);
    font-family: var(--light);
  }
`

export const BalanceInfoAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    font-size: 24px;
    color: var(--white);
    font-family: var(--semiBold);
  }

  > button {
    background: none;
    border-style: none;
    cursor: pointer;
  }
`

export const Service = styled.div`
  padding: 16px 24px;
`

export const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
  align-items: center;
`

export const ServiceTitle = styled.p`
  font-size: 16px;
  color: var(--white);
  font-family: var(--bold);
`

export const ServiceIcon = styled.img``
