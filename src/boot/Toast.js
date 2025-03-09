import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {

  run(type, message) {

    let options = {
      autoClose: 3000,
      type: type,
      hideProgressBar: false,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover: true,
      theme: 'light',
      limit: 4,
      style: {
        zIndex: '99999'
      }
    }

    switch (type) {
      case 'success':
        toast.success(message, options)
        break
      case 'error':
        toast.error(message, options)
        break
      case 'warning':
        toast.warning(message, options)
        break
      case 'info':
        toast.info(message, options)
        break
      default:
        break
    }

  }
}
