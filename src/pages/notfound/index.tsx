import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/u')
  })

  return null
}
