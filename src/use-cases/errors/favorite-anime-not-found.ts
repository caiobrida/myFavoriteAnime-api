export class FavoriteAnimeNotFoundError extends Error {
  constructor() {
    super('Favorite anime not found')
  }
}
