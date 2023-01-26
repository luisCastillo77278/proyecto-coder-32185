const socket = io()
const form = document.querySelector('form')
const formMessage = document.querySelector('#form_message')
const btnEnviar = document.querySelector('#btnEnviar')

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

formMessage.addEventListener('submit', (e)=>{
  e.preventDefault()
  const formData = Object.fromEntries(
    new FormData(e.target)
  )
  
  const {message, ...author} = formData

  const payload = {
    message,
    author: {
      ...author,
      date: new Date().toUTCString()
    }
  }

  socket.emit('addChat', payload)
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
