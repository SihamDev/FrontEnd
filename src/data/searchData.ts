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
    section: 'Dashbowwwards'
  },
 
]

export default data
