import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/u" state={{ from: location }} replace />
  }

  return children
}
