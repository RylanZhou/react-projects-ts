import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppBar, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles'

import { GlobalProvider } from './Context/GlobalState'

import TrackList from './Components/TrackList'
import Lyrics from './Components/Lyrics'

import './style.scss'

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      dark: '#004ba0',
      main: '#1976d2',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#48a999',
      dark: '#004c40',
      main: '#00796b',
      contrastText: '#ffffff'
    }
  }
})

export default function LyricsSearch(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <Router>
          <AppBar className="app-bar" position="static" color="primary">
            <Typography className="title" variant="h4">
              Lyrics Finder
            </Typography>
          </AppBar>

          <section className="page-container">
            <Switch>
              <Route exact path="/" component={TrackList} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </section>
        </Router>
      </GlobalProvider>
    </ThemeProvider>
  )
}
