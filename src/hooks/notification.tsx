import { useContext } from 'react'
import { NotificationContext } from '../context/notification'

export function useNotification() {
  const context = useContext(NotificationContext)
  return context
}
