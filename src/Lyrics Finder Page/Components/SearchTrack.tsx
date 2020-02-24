import * as React from 'react'
import { TextField, Paper, Button } from '@material-ui/core'
import { GiMusicalNotes } from 'react-icons/gi'

import { GlobalContext } from '../Context/GlobalState'

export default function SearchTrack(): JSX.Element {
  const { searchTrackByTitle } = React.useContext(GlobalContext)
  const [trackTitle, setTrackTitle] = React.useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTrackTitle(e.target.value)
  }

  const handleClick = (): void => {
    searchTrackByTitle(trackTitle)
  }

  return (
    <Paper elevation={0} className="search-track">
      <h1>
        <GiMusicalNotes className="icon" />
        Search For A Song
        <GiMusicalNotes className="icon" />
      </h1>
      <h3>Get the lyrics for every song!</h3>
      <TextField
        className="search-input"
        variant="outlined"
        label="Search A Track"
        color="secondary"
        value={trackTitle}
        onChange={handleChange}
      />
      <Button
        className="search-button"
        variant="contained"
        color="secondary"
        size="large"
        disabled={!trackTitle}
        onClick={handleClick}
      >
        Search
      </Button>
    </Paper>
  )
}
