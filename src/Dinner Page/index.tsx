import React, { ReactElement, useState, useEffect } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import axios from 'axios'
import { getDinnerData, DinnerDataType, Meal, NAMES } from './dinner'

import './styles.scss'

// const MOCK_DATA: DinnerDataType[] = [
//   {
//     name: 'Jinlong Wang',
//     floor: '37F ',
//     meal: 'xxxxxx',
//     index: 123
//   }
// ]

const COLORS = ['#9b59b6', '#3498db', '#2ecc71', '#1abc9c', '#e74c3c']
const FLOOR_COLORS: { [key: string]: string } = {
  '23F': '#ee4f2e',
  '26F': '#7f8c8d',
  '32F': '#34495e',
  '37F ': '#2c3e50'
}

const DinnerService = axios.create({ baseURL: 'http://localhost:5000/' })

export default (): ReactElement => {
  const [dinnerData, setDinnerData] = useState<DinnerDataType[]>([])
  const [mealsData, setMealsData] = useState<Array<Meal>>([])
  const [filter, setFilter] = useState<'FE' | 'QA' | 'ALL'>('ALL')

  const filterMap = {
    QA: ['Yunan Zhou', ...NAMES.slice(0, 7)],
    FE: ['Yunan Zhou', ...NAMES.slice(7)],
    ALL: ['Yunan Zhou', ...NAMES]
  }

  const getMealsData = async () => {
    try {
      const { data } = await DinnerService.get<{ meals: Array<Meal> }>('data')
      setMealsData(data.meals)
    } catch (error) {
      console.log(error)
    }
  }

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

  const changeFilter = (filter: 'QA' | 'FE' | 'ALL') => {
    setFilter(filter)
  }

  useEffect(() => {
    getMealsData()
  }, [])

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
        <ButtonGroup variant="contained" className="button-group">
          <Button
            color={filter === 'QA' ? 'secondary' : 'default'}
            onClick={() => changeFilter('QA')}
          >
            QA
          </Button>
          <Button
            color={filter === 'FE' ? 'secondary' : 'default'}
            onClick={() => changeFilter('FE')}
          >
            FE
          </Button>
          <Button
            color={filter === 'ALL' ? 'secondary' : 'default'}
            onClick={() => changeFilter('ALL')}
          >
            ALL
          </Button>
        </ButtonGroup>
      </section>

      <section>
        {dinnerData.map((each, index) => {
          if (!filterMap[filter].includes(each.name)) {
            return null
          }
          const [lastName, firstName] = each.name.split(' ')
          console.log(mealsData.find((item) => item.name === each.meal))
          const imageUrl = mealsData.find((item) => item.name === each.meal)
            ?.image_url
          return (
            <div key={each.floor + each.index} className="item">
              <div
                className="name-and-meal"
                style={{
                  backgroundImage: `url("http://dinner.szoa.shopee.com${imageUrl}")`,
                  backgroundColor: COLORS[index % COLORS.length]
                }}
              >
                <div className="cover" />
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
