import { Home, User, Circle, Sunrise, Users, Mail, Settings, Box } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'Representative',
    title: 'Representative',
    icon: <User size={20} />,
    children: [
      {
        id: 'registerRepresentative',
        title: 'Add Representative',
        icon: <Circle size={20} />,
        navLink: '/register-representative',
        exact: true
      },
      {
        id: 'listRepresentatives',
        title: 'List Representatives',
        icon: <Circle size={20} />,
        navLink: '/list-representative',
        exact: true
      }
    ]
  },
  {
    id: 'Event',
    title: 'Event',
    icon: <Sunrise size={20} />,
    children: [
      {
        id: 'registerEvent',
        title: 'Add Event',
        icon: <Circle size={20} />,
        navLink: '/register-event',
        exact: true
      },
      {
        id: 'listEvent',
        title: 'List Events',
        icon: <Circle size={20} />,
        navLink: '/list-event',
        exact: true
      }
    ]
  },
  {
    id: 'Contact',
    title: 'Contacts',
    icon: <Users size={20} />,
    children: [
      {
        id: 'listContacts',
        title: 'List Contacts',
        icon: <Circle size={20} />,
        navLink: '/list-contacts',
        exact: true
      }
    ]
  },
  {
    id: 'CustomAttributes',
    title: 'Custom Attributes',
    icon: <Box size={20} />,
    children: [
      {
        id: 'Add Attributes',
        title: 'Add Attributes',
        icon: <Circle size={20} />,
        navLink: '/add-attributes',
        exact: true
      },
      {
        id: 'listCustomAttributes',
        title: 'List Attributes',
        icon: <Circle size={20} />,
        navLink: '/list-custom-attributes',
        exact: true
      }
    ]
  }
]
