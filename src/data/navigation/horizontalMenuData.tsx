// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

type Params = {
  [key: string]: string | string[]
}

const horizontalMenuData = (
  dictionary: Awaited<ReturnType<typeof getDictionary>>,
  params: Params
): HorizontalMenuDataType[] => [
    // This is how you will normally render submenu
    {
      label: dictionary['navigation'].dashboards,
      icon: 'tabler-smart-home',
    },
    {
      label: dictionary['navigation'].assistants,
      icon: 'tabler-smart-home',
    },
  ]

export default horizontalMenuData
