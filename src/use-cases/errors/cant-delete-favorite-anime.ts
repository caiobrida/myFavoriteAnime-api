export class CantDeleteFavoriteAnimeError extends Error {
  constructor() {
    super('Cannot delete favorite anime, anime not found')
  }
}
