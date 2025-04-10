import { useEffect } from 'react'

const ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.jakimif.stricrestyle&hl=pt_BR'
const IOS_URL = 'https://apps.apple.com/br/app/stric/id6464080224'

// Essa página serve de uma ponte entre um link para o app Stric e a loja certa (baseado no aparelho)
// Por padrão manda para a Google Play.
export default function RedirectToApp() {
  useEffect(() => {
    try {
      const userAgent = navigator.userAgent.toLowerCase()
      const isIOS = /iphone|ipad|ipod/.test(userAgent)

      // Redirect to iOS App Store if on iOS device, otherwise default to Google Play
      window.location.href = isIOS ? IOS_URL : ANDROID_URL
    } catch (error) {
      // If there's any error in detection, default to Google Play
      window.location.href = ANDROID_URL
    }
  }, [])

  return <div />
}
