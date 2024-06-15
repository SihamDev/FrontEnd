// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

type Params = {
  [key: string]: string | string[]
}

const verticalMenuData = (
  dictionary: Awaited<ReturnType<typeof getDictionary>>,
  params: Params
): VerticalMenuDataType[] => [
    // This is how you will normally render submenu
    {
      label: dictionary['navigation'].dashboards,
      suffix: {
        label: '2',
        color: 'error'
      },
      icon: 'tabler-smart-home',
    },
    {
      label: dictionary['navigation'].agents,
      suffix: {
        label: '2',
        color: 'error'
      },
      icon: 'tabler-smart-home',
    },

  ]

export default verticalMenuData
