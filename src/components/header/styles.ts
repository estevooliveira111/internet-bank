import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  display: flex;
`

export const HeaderWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  background-color: var(--white);
  position: relative;
  padding: 0 32px;
`

export const ClientInfo = styled.div`
  margin-left: 32px;
  border: 1px solid var(--gray-light);
  border-radius: 8px;
  cursor: pointer;
  width: 280px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 32px;
  top: 9px;
  display: none;

  @media (min-width: 720px) {
    display: unset;
  }
`
export const SidebarButton = styled.button`
  background: none;
  border-style: none;
  height: 80px;
  width: 80px;
  background-color: var(--brand-background);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 720px) {
    display: none;
  }
`

export const BellWrapper = styled.div`
  position: relative;

  @media (min-width: 720px) {
    margin-right: 320px;
  }
`
export const ButtonBell = styled.button`
  background: none;
  outline: 0;
  border-style: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 6px;
`

export const Box = styled.div`
  > span {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--white);
    position: absolute;
    margin-left: 240px;
    top: -5px;

    @media (min-width: 720px) {
      margin-right: auto;
      margin-left: auto;
      left: 0;
      right: 0;
      top: -5px;
    }
  }
`

export const BoxNotifications = styled.div`
  width: 280px;
  height: 280px;
  overflow: scroll;
  padding: 16px;

  ::-webkit-scrollbar {
    visibility: hidden;
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const BoxWrapper = styled(motion.div)`
  background-color: var(--white);
  border-radius: 8px;
  position: absolute;

  left: -230px;
  top: 40px;

  @media (min-width: 720px) {
    left: -125px;
    top: 40px;
  }

  box-shadow: 0px 0px 10px -5px black;

  z-index: 2;
`
