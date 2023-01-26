const socket = io()
const form = document.querySelector('form')
const formChat = document.querySelector('#form-chat')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const producto = Object.fromEntries(
    new FormData(e.target)
  )

  if (!producto.title) { return }

  if (!producto.price) { return }

  socket.emit('addProducto', producto)
  form.reset()
})

formChat.addEventListener('submit', (e) => {
  e.preventDefault()

  const payload = Object.fromEntries(
    new FormData(e.target)
  )

  const isNotInput = Object.values(payload).some(input => input === '')
  if (isNotInput) return

  const { message, ...users } = payload
  const data = {
    message,
    users
  }

  socket.emit('addChat', { data })
  form.reset()
})

socket.on('productos', async (payload) => {
  const productos = document.querySelector('#productos')
  await PlantillaRender(productos, 'tabla', payload)
})

socket.on('chats', async (payload) => {
  const chats = document.querySelector('#list-chat')

  const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' })
  const messageSchema = new normalizr.schema.Entity('message', { author: authorSchema })
  const messagesSchema = new normalizr.schema.Array({ messages: messageSchema })

  const denormalizer = new normalizr.denormalize(payload.result, messagesSchema, payload.entities)

  await PlantillaRender(chats, 'lista', denormalizer)
})

const PlantillaRender = async (elementDom, namePlantilla, content) => {
  const plantilla = await fetch(`../plantillas/${namePlantilla}.handlebars`).then(resp => resp.text())
  const functionTemplate = Handlebars.compile(plantilla)
  const html = functionTemplate({ content })
  elementDom.innerHTML = html
}
