import * as React from 'react'

import GlobalProvider from './GlobalState'

import Header from './Components/Header'
import EpisodeList from './Components/EpisodeList'

import './style.scss'

export default function EpisodePage(): JSX.Element {
  return (
    <div className="page-container">
      <GlobalProvider>
        <Header />
        <EpisodeList />
      </GlobalProvider>
    </div>
  )
}
