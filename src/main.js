import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import naive from 'naive-ui';
import moment from 'moment';
import { ToastService, ConfirmationService } from 'primevue';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';


import App from './App.vue'
import router from './router'

import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import VueBarcode from '@chenfengyuan/vue-barcode';

import 'moment/locale/pt-br';
import ptMessages from './locales/pt-BR.json';
moment.locale('pt-br');

import { currencyBR } from './utils/FormatMonetaryValue';

const app = createApp(App)
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$amount = currencyBR;


app.use(ToastService);
app.use(ConfirmationService);


app.use(PrimeVue, {
  locale: ptMessages,
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
      darkModeSelector: false,
    },
  }
})


app.use(createPinia())
  .use(naive)
  .use(VueTheMask)
  .use(money)
  .use(router)
  .component(VueBarcode.name, VueBarcode)
  .mount('#app')

