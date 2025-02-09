import { AnimesRepository } from '../animes-repository'

export class InMemoryAnimesRepository implements AnimesRepository {
  public items: {
    data: Record<string, string | boolean | number>[]
    pagination: Record<string, string | number> | null
  } = { data: [], pagination: null }

  async findAll(page: number, search: string) {
    const obj: {
      data: Record<string, string | boolean | number>[]
      pagination: Record<string, string | number> | null
    } = {
      data: this.items.data
        .filter((i) => String(i.name).toLowerCase().includes(search))
        .slice((page - 1) * 10, page * 10),
      pagination: { page, limit: 10 },
    }

    return obj
  }
}
