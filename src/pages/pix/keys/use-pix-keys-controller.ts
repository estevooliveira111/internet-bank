import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotification } from '@hooks/notification'
import { api, parseError } from '@lib/axios'
import { type PixKey, type Output } from '@pages/pix/contracts/keys'

export function usePixKeys(): Output {
  const [loading, setLoading] = useState(true)
  const [pixKeys, setPixKeys] = useState<PixKey[]>([])
  const { showNotification } = useNotification()
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [pixDelete, setPixDelete] = useState<PixKey | null>(null)

  const navigate = useNavigate()
  useEffect(() => {
    fetchPixKeys()
  }, [])

  async function fetchPixKeys() {
    setLoading(true)
    api
      .get('/pix/keys/show-many')
      .then(({ data }) => {
        setPixKeys(data.keys)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function handleDelete() {
    try {
      setLoading(true)
      await api.delete(`pix/keys/${pixDelete?.key}/remove`)
      await fetchPixKeys()
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao deletar a chave pix.',
        message: error.message,
      })
    } finally {
      setPixDelete(null)
      setOpenConfirmDelete(false)
      setLoading(false)
    }
  }

  return {
    loading,
    pixKeys,
    openConfirmDelete,
    navigate,
    handleDelete,
    setPixDelete,
    setOpenConfirmDelete,
  }
}
