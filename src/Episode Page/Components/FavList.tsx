import * as React from 'react'

import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { FaBars } from 'react-icons/fa'

import { GlobalContext } from '../GlobalState'
import { EpisodeIF } from '../types'

export default function FavList(): JSX.Element {
  const {
    state: { favorites }
  } = React.useContext(GlobalContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLinkClick = (url: string): void => {
    window.open(url)
  }

  return (
    <React.Fragment>
      <IconButton className="fav-list" onClick={handleClick}>
        <FaBars />
      </IconButton>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        {favorites.length ? (
          favorites.map((favorite: EpisodeIF) => (
            <MenuItem
              key={favorite.id}
              onClick={() => handleLinkClick(favorite.url)}
            >
              {favorite.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem>PICK A FAV FIRST! :)</MenuItem>
        )}
      </Menu>
    </React.Fragment>
  )
}
