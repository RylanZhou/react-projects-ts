import express from 'express'
import axios from 'axios'

type Menu = {
  id: number
  name: string
  comment: string
  poll_start: string
  poll_end: string
  serving_time: string
  active: boolean
}

type Food = {
  code: string
  id: number
  name: string
  description: string
  image_url: string
  ordered: number
  quota: number
  disabled: boolean
  remaining: number
}

const BASE_URL = 'http://dinner.szoa.shopee.com/api/'
const TOKEN = '4b5dace20bf1d0118e3105de2ab720c847c154b9'

const DinnerService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Token ' + TOKEN
  }
})

const getMenuId = async () => {
  const { data } = await DinnerService.get<{ menu: Menu }>('current')
  return data.menu.id
}

const getMeals = async (menuId: number) => {
  const { data } = await DinnerService.get<{ food: Array<Food> }>(
    `menu/${menuId}`
  )
  return data.food
}

const route: express.Router = express.Router()

route.get('/data', async (request, response) => {
  try {
    const menuId = await getMenuId()
    const mealsData = await getMeals(menuId)
    response.status(200).json({ meals: mealsData })
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
})

export default route
