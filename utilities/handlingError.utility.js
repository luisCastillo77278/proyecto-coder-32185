export const HandlingError = {
  ErrorFind: (id) => ({
    message: `El elemento con ${id} no se encuentra`
  }),
  TrhowError: (err) => ({
    error: `${err}`
  }),
  Message: (message) => ({
    message
  })
}
