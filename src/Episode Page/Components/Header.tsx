import * as React from 'react'

import FavList from './FavList'

export default function Header(): JSX.Element {
  return (
    <div className="header">
      <h1>Rick & Morty</h1>
      <h3>Pick your favorite episodes!</h3>
      <FavList />
    </div>
  )
}
