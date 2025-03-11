/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState } from 'react'
import { Header } from '../../components/header'
// import ModalReference from '../../components/ModalReference'

import { Outlet, useLocation } from 'react-router-dom'
import { Container, Content } from './styles'
import { Sidebar } from '../../components/sidebar'
import { useEffect, useState } from 'react'
import { useNotification } from '../../hooks/notification'

export function PrivateLayout() {
  const { isShow, hidden } = useNotification()
  const location = useLocation()
  useEffect(() => {
    if (isShow) {
      hidden()
    }

    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [location.pathname])

  const [SidebarMobileisactive, setSidebarMobileisactive] = useState(false)

  const handleSidebarMobileToggle = () => {
    setSidebarMobileisactive((state) => !state)
  }

  return (
    <Container>
      <Sidebar isactive={SidebarMobileisactive} />
      <Content>
        <Header
          handleSidebarFunction={handleSidebarMobileToggle}
          sidebarisactive={SidebarMobileisactive}
        />
        <Outlet />
      </Content>
    </Container>
  )
}
