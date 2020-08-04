import React, { ReactElement, useState } from 'react'
import { getDinnerData, DinnerDataType } from './dinner'
import { Button } from '@material-ui/core'

import './styles.scss'

const MOCK_DATA: DinnerDataType[] = [
  {
    name: 'Jinlong Wang',
    floor: '23F',
    meal: 'xxxxxx',
    index: 123
  }
]

const COLORS = ['#9b59b6', '#3498db', '#2ecc71', '#1abc9c', '#e74c3c']
const FLOOR_COLORS: { [key: string]: string } = {
  '23F': '#ee4f2e',
  '26F': '#7f8c8d',
  '32F': '#34495e'
}

export default (): ReactElement => {
  const [dinnerData, setDinnerData] = useState<DinnerDataType[]>(MOCK_DATA)

  const handleImportExcel = async (event: any) => {
    const { files } = event.target
    const fileReader = new FileReader()
    fileReader.onload = async (event) => {
      event.preventDefault()
      try {
        const result = event.target?.result
        setDinnerData(getDinnerData(result))
      } catch (error) {
        console.log(error)
        alert('Problematic Imports!')
      }
    }
    fileReader.readAsBinaryString(files[0])
  }

  return (
    <div className="container">
      <section>
        <input
          className="input"
          accept=".xlsx, .xls"
          id="contained-button-file"
          type="file"
          onChange={handleImportExcel}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </section>

      <section>
        {dinnerData.map((each, index) => {
          const [lastName, firstName] = each.name.split(' ')
          return (
            <div key={each.index} className="item">
              <div
                className="name-and-meal"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              >
                <div className="first-name">
                  <span className="first-letter">{firstName[0]}</span>
                  <span>{firstName.substring(1)}</span>
                </div>
                <div className="last-name">{lastName}</div>
                <div className="meal">{each.meal}</div>
              </div>
              <div className="index-and-floor">
                <div className="no">#</div>
                <div className="index">
                  {`${('0'.repeat(3) + each.index).slice(-3)}`}
                </div>
                <div
                  className="floor"
                  style={{ backgroundColor: FLOOR_COLORS[each.floor] }}
                >
                  {each.floor}
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
