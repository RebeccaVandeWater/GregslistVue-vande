import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {

  async getHouses() {
    const res = await api.get('/api/houses')

    logger.log(res.data)

    const houses = res.data.map(pojo => new House(pojo))

    AppState.houses = houses
  }

  async createHouse(house) {
    const res = await api.post('/api/houses', house)

    logger.log("Created House", res.data)

    const newHouse = new House(res.data)

    AppState.houses.push(newHouse)
  }

  async removeHouse(houseId) {
    const res = await api.delete(`/api/houses/${houseId}`)

    logger.log("Deleted House?", res.data)

    const houseIndex = AppState.houses.findIndex(h => h.id == houseId)

    AppState.houses.splice(houseIndex, 1)
  }

  setHouseToEdit(houseToEdit) {
    AppState.selectedHouse = houseToEdit
  }
}

export const housesService = new HousesService