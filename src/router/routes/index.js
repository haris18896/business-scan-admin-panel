import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - VISAB - Admin Panel'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },

  {
    path: '/login',
    component: lazy(() => import('../../views/auth')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/profile/update',
    component: lazy(() => import('../../views/admin/update/UpdateProfile')),
    layout: 'BlankLayout'
  },
  {
    path: '/password/update',
    component: lazy(() => import('../../views/admin/update/UpdatePassword')),
    layout: 'BlankLayout'
  },
  {
    path: '/register-representative',
    component: lazy(() => import('../../views/representative/RegisterRepresentative'))
  },
  {
    path: '/list-representative',
    component: lazy(() => import('../../views/representative/ListRepresentative'))
  },
  {
    path: '/update-representative/:id',
    component: lazy(() => import('../../views/representative/UpdateRepresentative'))
  },

  {
    path: '/view-representative/:id',
    component: lazy(() => import('../../views/representative/ViewRepresentative'))
  },

  {
    path: '/register-event',
    component: lazy(() => import('../../views/Event/RegisterEvent'))
  },
  {
    path: '/list-event',
    component: lazy(() => import('../../views/Event/ListEvents'))
  },
  {
    path: '/update-event/:id',
    component: lazy(() => import('../../views/Event/UpdateEvent'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/list-contacts',
    component: lazy(() => import('../../views/contacts/ListContacts'))
  },
  {
    path: '/update-contact/:id',
    component: lazy(() => import('../../views/contacts/updateContact'))
  },

  {
    path: '/list-custom-attributes',
    component: lazy(() => import('../../views/CustomAttributes/ListCustomAttributes'))
  },
  {
    path: '/add-attributes',
    component: lazy(() => import('../../views/CustomAttributes/AddCustomAttributes'))
  },
  {
    path: '/update-attributes/:id',
    component: lazy(() => import('../../views/CustomAttributes/UpdateCustomAttributes'))
  }
]

export { DefaultRoute, TemplateTitle, Routes }
