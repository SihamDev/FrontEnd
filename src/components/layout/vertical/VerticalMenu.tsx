'use client'

// Next Imports
import { useParams } from 'next/navigation'
import { useState } from 'react'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem } from '@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  // State to track active link
  const [activeLink, setActiveLink] = useState('')

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const handleMenuItemClick = (link: string) => {
    setActiveLink(link)
  }

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >

        <MenuItem
          href={`/${locale}/dashboards`}
          icon={<i className='tabler-dashboard' />}
          className={activeLink === `/${locale}/dashboards` ? 'mui-1xxq1dc' : ''}
          onClick={() => handleMenuItemClick(`/${locale}/dashboards`)}
        >
          {dictionary['navigation'].dashboards}
        </MenuItem>

        <MenuItem
          href={`/${locale}/apps/agents/list`}
          icon={<i className='tabler-users' />}
          className={activeLink === `/${locale}/apps/agents/list`}
          onClick={() => handleMenuItemClick(`/${locale}/apps/agents/list`)}
        >
          {dictionary['navigation'].agents}
        </MenuItem>

        <MenuItem
          href={`/${locale}/apps/logs/list`}
          icon={<i className='tabler-file-text' />}
          className={activeLink === `/${locale}/apps/logs/list` ? 'mui-1xxq1dc' : ''}
          onClick={() => handleMenuItemClick(`/${locale}/apps/logs/list`)}
        >
          {dictionary['navigation'].log}
        </MenuItem>

        <MenuItem
          href={`/${locale}/apps/settings`}
          icon={<i className='tabler-settings' />}
          className={activeLink === `/${locale}/apps/settings` ? 'mui-1xxq1dc' : ''}
          onClick={() => handleMenuItemClick(`/${locale}/apps/settings`)}
        >
          {dictionary['navigation'].settings}
        </MenuItem>

        <MenuItem
          href={`/${locale}/apps/billings`}
          icon={<i className='tabler-credit-card' />}
          className={activeLink === `/${locale}/apps/billings` ? 'mui-1xxq1dc' : ''}
          onClick={() => handleMenuItemClick(`/${locale}/apps/billings`)}
        >
          {dictionary['navigation'].billings}
        </MenuItem>

      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
