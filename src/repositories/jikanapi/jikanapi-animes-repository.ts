import axios from 'axios'
import { AnimesRepository } from '../animes-repository'

export class JikanApiAnimesRepository implements AnimesRepository {
  async findAll(page: number) {
    const response = await axios.get('https://api.jikan.moe/v4/anime', {
      params: {
        page,
        limit: 10,
      },
    })

    let data = []
    let pagination = null

    if (response && response.data) {
      data = response.data.data
      pagination = response.data.pagination
    }

    return { data, pagination }
  }
}
