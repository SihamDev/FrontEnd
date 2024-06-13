// Third-party Imports
import type { Action } from 'kbar'

export type SearchData = Action & {
  url: string
}

const data: SearchData[] = [
  {
    id: '1',
    name: 'Dashboards',
    url: '/dashboards/',
    icon: 'tabler-chart-pie-2',
    section: 'Dashboards'
  },
  {
    id: '2',
    name: 'Assistants',
    url: '/assistants/',
    icon: 'tabler-chart-pie-2',
    section: 'Assistants'
  },
]

export default data
