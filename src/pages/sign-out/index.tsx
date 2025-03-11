import { useEffect } from 'react'
import { useAuth } from '../../hooks/auth'

export function SignOut() {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
  })

  return null
}
