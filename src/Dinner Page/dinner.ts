import xlsx from 'xlsx'

export type DinnerDataType = {
  name: string
  meal: string
  index: number
  floor: string
}

export type Meal = { name: string; image_url: string }

export const NAMES = [
  'Jinlong Wang',
  'Shuangqing Chen',
  'Yunan Zhou',
  'Zibo Zhang',
  'Yin Jun',
  'Tao Mu',
  'Danlei Qiang',
  'Zijun Yuan',
  'Zhouhua Tang',
  'Tieshan Zhang',
  'Liqi Shi',
  'Ximing Peng'
]

export const getDinnerData = (target: any): DinnerDataType[] => {
  try {
    const workbook = xlsx.read(target, { type: 'binary' })
    const FLOORS = ['23F', '26F', '32F', '37F ']

    const result: DinnerDataType[] = []

    for (const floor of FLOORS) {
      const sheet = workbook.Sheets[floor]
      const data: any[] = xlsx.utils.sheet_to_json(sheet)

      let currentMeal = ''
      for (const row of data) {
        if ('加班餐套餐' in row) {
          currentMeal = row['加班餐套餐']
        }
        if (row['姓名'] && NAMES.includes(row['姓名'])) {
          result.push({
            name: row['姓名'],
            meal: currentMeal,
            index: row['序号'],
            floor
          })
        }
      }
    }

    return result
  } catch (error) {
    throw error
  }
}
