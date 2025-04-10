import { useEffect } from 'react'
import { useAuth } from '../../hooks/auth'
import { useNavigate, useParams } from 'react-router-dom'

export function SignInToken() {
  const params = useParams()
  const navigate = useNavigate()
  const { signInWithToken, user } = useAuth()

  useEffect(() => {
    signInWithToken(params.token!)
  }, [params.token, signInWithToken])

  useEffect(() => {
    if (user && user.step) {
      if (user.step === 'ACTIVATED') {
        navigate('/')
      } else if (
        user.step === 'WAITING_EMAIL' ||
        user.step === 'WAITING_EMAIL_CONFIRMATION'
      ) {
        navigate('/u/onboarding/email')
      } else if (
        user.step === 'WAITING_PHONE' ||
        user.step === 'WAITING_PHONE_CONFIRMATION'
      ) {
        navigate('/u/onboarding/phone')
      } else if (
        user.step === 'WAITING_INDIVIDUAL' ||
        user.step === 'WAITING_INDIVIDUAL_BIRTHDATE' ||
        user.step === 'WAITING_INDIVIDUAL_DOCUMENT' ||
        user.step === 'WAITING_INDIVIDUAL_PARENTS_NAME' ||
        user.step === 'WAITING_INDIVIDUAL_INCOME' ||
        user.step === 'WAITING_INDIVIDUAL_PUBLICLY_EXPOSED_PERSON' ||
        user.step === 'WAITING_NATIONALITY' ||
        user.step === 'WAITING_NATIONALITY'
      ) {
        navigate('/u/onboarding/individual')
      } else if (user.step === 'WAITING_ADDRESS') {
        navigate('/u/onboarding/address')
      } else if (
        user.step === 'WAITING_DOCUMENTS' ||
        user.step === 'WAITING_DOCUMENTS_SELFIE' ||
        user.step === 'WAITING_DOCUMENTS_FRONT' ||
        user.step === 'WAITING_DOCUMENTS_BACK' ||
        user.step === 'RESEND_DOCUMENTS'
      ) {
        navigate('/u/onboarding/documents')
      } else if (user.step === 'WAITING_COMPANY_DATA') {
        navigate('/u/onboarding/company')
      } else if (user.step === 'WAITING_COMPANY_ADDRESS') {
        // precisa do company_id aqui
        navigate('/u/onboarding/company-address/ID')
      } else if (user.step === 'WAITING_ANALYSYS') {
        navigate('/u/onboarding/analysis')
      } else if (user.step === 'IN_ANALYSIS') {
        navigate('/u/onboarding/analysis')
      }
    }
  }, [user, navigate])

  return null
}
