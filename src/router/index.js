import { createRouter, createWebHistory } from 'vue-router'

// templates
import DefaultTemplate from '../templates/DefaultTemplate.vue'
import Auth from '@/guard/Auth';
import { theme } from '@/services/Thema';

const router = createRouter({
  history: createWebHistory(),
  routes: [



    // {
    //    name: 'NotFound',
    //    path: '/:pathMatch(.*)*',
    //    component: () => import('../views/MaintenanceView.vue')
    //  },

    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    },

    {
      path: '/px/:pix',
      meta: { title: 'Pagamento de Pix' },
      name: 'payPixPublico',
      component: () => import('../views/public/PixView.vue')
    },

    {
      path: '/pdf/:code',
      meta: { title: 'Pagamento de Pix' },
      name: 'payPdfPublico',
      component: () => import('../views/public/PDFView.vue')
    },

    {
      path: '/cob/:code',
      meta: { title: 'Pagamento de Cobrança' },
      name: 'chargePublico',
      component: () => import('../views/public/ChargeView.vue')
    },

    {
      path: '/',
      beforeEnter: Auth,
      component: DefaultTemplate,
      children: [
        { path: '/', name: 'home', redirect: { name: 'dashboard' } },
        {
          path: '/dashboard',
          meta: { title: 'Dashboard' },
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        }, {
          path: '/clientes',
          meta: { title: 'Clientes' },
          name: 'client',
          component: () => import('../views/clients/ListView.vue')
        },
        {
          path: '/cliente/novo',
          meta: { title: 'Novo Cliente' },
          name: 'client_new',
          component: () => import('../views/clients/ClientShowView.vue')
        },
        {
          path: ':code/cliente/update',
          meta: { title: 'Atualizar Cliente' },
          name: 'client_update',
          component: () => import('../views/clients/ClientShowView.vue')
        },
        {
          path: 'cliente/:code/',
          meta: { title: 'Sobre Cliente' },
          name: 'client_show',
          component: () => import('../views/clients/ClientShowView.vue')
        },

        {
          path: '/configuracoes/minha-conta',
          meta: { title: 'Conta principal' },
          name: 'settings-main-account',
          component: () => import('../views/SettingsMainAccountView.vue')
        },

        {
          path: '/configuracoes/contas-vinculadas',
          meta: { title: 'contas Vinculadas' },
          name: 'settings-sub-accounts',
          component: () => import('../views/SettingsSubAccountsView.vue')
        },
        {
          path: '/configuracoes/conta-vinculada',
          meta: { title: 'Configurações' },
          name: 'settings-sub-account',
          component: () => import('../views/SettingsSubAccountView.vue')
        },
        {
          path: '/configuracoes/adicionar-contas',
          meta: { title: 'Adicionar contas' },
          name: 'settings-add-accounts',
          component: () => import('../views/AddUserView.vue')
        },

        {
          path: '/configuracoes/tags',
          meta: { title: 'Tags' },
          name: 'settings-split',
          component: () => import('../views/SplitView.vue')
        },
        {
          path: '/configuracoes/tags/novo',
          meta: { title: 'Nova Tags' },
          name: 'settings-split-new',
          component: () => import('../views/SplitNewView.vue')
        },
        {
          path: '/configuracoes/tags/:code/info',
          meta: { title: 'Detalhes de Tag Split' },
          name: 'settings-split-info',
          component: () => import('../views/SplitInfoView.vue')
        },
        {
          path: '/pixs-gerados',
          meta: { title: 'Pixs' },
          name: 'pixs-list',
          component: () => import('../views/PixList.vue')
        },


        {
          path: '/split-reports',
          meta: { title: 'Pixs' },
          name: 'split-reports',
          component: () => import('../views/SplitReports.vue')
        },






        {
          path: '/receber-pix',
          meta: { title: 'Receber Pix' },
          name: 'pix-in',
          component: () => import('../views/PixInView.vue'),
          children: [
            {
              path: 'listar',
              meta: { title: 'Listar PIX criados' },
              name: 'list-pix-in',
              component: () => import('../views/ListPixInView.vue')
            }
          ]
        },
        {
          path: '/extrato',
          meta: { title: 'Extrato' },
          name: 'extract',
          component: () => import('../views/ListTransactionsView.vue')
        },
        {
          path: '/qrcode-fixo',
          meta: { title: 'QRCode Fixo' },
          name: 'fixed-qrcode',
          component: () => import('../views/FixedPixView.vue')
        },

        {
          path: '/ultimos-depositos',
          meta: { title: 'ùltimos Depósitos' },
          name: 'last-deposits',
          component: () => import('../views/LastIncomesView.vue')
        },
        {
          path: '/documentacao',
          meta: { title: 'Documentação' },
          name: 'documentation',
          component: () => import('../views/DocumentationView.vue')
        },
        {
          path: '/transferir-pix',
          meta: { title: 'Transferir Pix' },
          name: 'pix-out',
          component: () => import('../views/PixOutView.vue')
        },
        {
          path: '/suporte',
          meta: { title: 'Suporte' },
          name: 'support',
          component: () => import('../views/SupportView.vue')
        },
        {
          path: '/criar-pagamento-boleto',
          meta: { title: 'Boletos' },
          name: 'boletos',
          component: () => import('../views/CreateBoletoView.vue')
        },
        {
          path: '/notificacoes',
          meta: { title: 'Notificações' },
          name: 'notifications',
          component: () => import('../views/NotificationsView.vue')
        },
        {
          path: '/cobrancas',
          meta: { title: 'Cobranças' },
          name: 'cobrancas',
          component: () => import('../views/ChargesView.vue')
        },
        {
          path: '/cobrancas/novo',
          meta: { title: 'Nova Cobrança' },
          name: 'new_cobrancas',
          component: () => import('../views/ChargeNewView.vue')
        },
        {
          path: 'cobranca/:code/detalhes',
          meta: { title: 'Detalhes da Cobrança' },
          name: 'show_cobrancas',
          component: () => import('../views/ChargeShowView.vue')
        },
        {
          path: '/cobrancas/:code/update',
          meta: { title: 'Atualização Cobrança' },
          name: 'update_cobrancas',
          component: () => import('../views/ChargeNewView.vue')
        },

        {
          path: 'upload/:typeUpload/:idPath',
          meta: { title: 'Detalhes da Cobrança' },
          name: 'process_upload',
          component: () => import('../views/UploadView.vue')
        }

      ]
    },

    {
      path: '/login',
      meta: { title: 'Login' },
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }, {
      path: '/resetar-senha',
      meta: { title: 'Resetar Senha' },
      name: 'reset-password',
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: '/cadastro',
      meta: { title: 'Fazer Cadastro' },
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
    },

    {
      path: '/cadastro/:code/phone',
      meta: { title: 'Fazer Cadastro' },
      name: 'register_phone_valid',
      component: () => import('../views/auth/RegisterPhoneView.vue')
    },
    {
      path: '/cadastro/:code/email',
      meta: { title: 'Fazer Cadastro' },
      name: 'register_email_valid',
      component: () => import('../views/auth/RegisterEmailView.vue')
    },

    {
      path: '/cadastro/:code/sucess',
      meta: { title: 'Fazer Cadastro' },
      name: 'register_email_valid',
      component: () => import('../views/auth/RegisterSucessView.vue')
    },


  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' - ' + theme().name
  }
  next()
})

export default router
