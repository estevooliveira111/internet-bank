import styled from 'styled-components'

// Home
export const AccountStats = styled.div`
  width: 100%;
  min-height: 192px;
  padding: 32px;
  gap: 32px;
  background-color: var(--brand-background-dark);

  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const Card = styled.div`
  flex: 1;
  height: 90px;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 16px;
    background-color: rgba(0, 0, 0, 0.3);
    left: 0;
  }

  > p {
    font-family: var(--light);
    font-size: 16px;
    color: var(--white);

    @media (min-width: 720px) {
      font-size: 12px;
    }
  }

  > span {
    font-family: var(--semiBold);
    font-size: 32px;
    color: var(--white);

    @media (min-width: 720px) {
      font-size: 24px;
    }
  }

  &.balance {
    background-color: var(--primary);
  }
  &.profitability {
    background-color: var(--green);
  }
  &.bills {
    background-color: var(--white);

    > p,
    span {
      color: var(--gray);
    }
  }

  @media (min-width: 720px) {
    height: 128px;
  }

  @media (min-width: 1000px) {
    > p {
      font-family: var(--light);
      font-size: 14px;
      color: var(--white);
    }
    > span {
      font-family: var(--semiBold);
      font-size: 28px;
      color: var(--white);
    }
  }

  @media (min-width: 1280px) {
    > p {
      font-family: var(--light);
      font-size: 16px;
      color: var(--white);
    }
    > span {
      font-family: var(--semiBold);
      font-size: 32px;
      color: var(--white);
    }
  }
`
export const CardAccountInfo = styled.div`
  max-height: 128px;
  border-radius: 8px;
  padding: 12px 32px;
  display: none;
  background-color: var(--brand-background-alternative);

  > div {
    > p {
      font-size: 12px;
      color: var(--white);

      &.name {
        font-family: var(--semiBold);
        white-space: nowrap;
      }
      &.id {
        font-family: var(--light);
      }
      &.bankCode {
        font-family: var(--light);
      }
      &.agency {
        font-family: var(--light);
      }
      &.account {
        font-family: var(--light);
      }
    }
  }

  @media (min-width: 720px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1280px) {
    > div {
      > p {
        font-family: var(--light);
        font-size: 14px;
        color: var(--white);

        &.name {
          font-family: var(--semiBold);
          font-size: 12px;
        }
      }
    }
  }
`

export const Transactions = styled.div`
  flex: 1;
  background-color: var(--background);

  padding: 32px;
  gap: 32px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'orders'
    'projection'
    'contacts'
    'items';

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      'orders orders projection contacts'
      'orders orders items items';
  }
`

export const Items = styled.div`
  grid-area: items;
  gap: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 176px 176px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: minmax(176px, 1fr);
    grid-gap: 32px;
  }
`

export const Action = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;

  position: relative;

  &::after {
    content: '';
    width: 16px;
    height: 4px;
    background-color: var(--primary);
    position: absolute;
    top: 0;
  }
`

// Orders
export const Order = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  & + div {
    margin-top: 16px;

    &::before {
      content: '';
      background: var(--gray-light);
      height: 18px;
      width: 1px;
      position: absolute;
      left: 20px;
      top: -16px;
    }
  }
`

// Contacts
export const HeaderWrapperContacts = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-light);
  padding: 24px 32px;

  > span {
    color: var(--text-primary);
    font-size: 16px;
    font-family: var(--semiBold);
  }
`

export const HeaderContacts = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 4px;
    height: 16px;
    background-color: var(--primary);
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
  }
`

// Projection
export const HeaderWrapperProjection = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-light);
  padding: 24px 32px;

  > span {
    color: var(--text-primary);
    font-size: 16px;
    font-family: var(--semiBold);
  }

  > div {
    display: flex;
    align-items: center;

    > p {
      color: var(--gray);
      font-size: 14px;
      font-family: var(--regular);
      margin-right: 7px;
    }
  }
`

export const HeaderProjection = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 4px;
    height: 16px;
    background-color: var(--primary);
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
  }
`
