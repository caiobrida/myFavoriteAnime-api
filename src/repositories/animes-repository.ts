export interface AnimesRepository {
  findAll(page: number): Promise<{
    data: Record<string, string | boolean | number>[]
    pagination: Record<string, string | number> | null
  }>
}
