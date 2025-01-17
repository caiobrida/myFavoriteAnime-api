export class UsernameInUseError extends Error {
  constructor() {
    super('Username already in use')
  }
}
