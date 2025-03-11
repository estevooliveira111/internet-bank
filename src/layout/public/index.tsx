/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useNotification } from '../../hooks/notification'

export function PublicLayout() {
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

  return <Outlet />
}
