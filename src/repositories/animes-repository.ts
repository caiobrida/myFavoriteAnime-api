export interface AnimesRepository {
  findAll(
    page: number,
    search: string,
  ): Promise<{
    data: Record<string, string | boolean | number>[]
    pagination: Record<string, string | number> | null
  }>
}
