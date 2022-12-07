const socket = io()
const form = document.querySelector('form')
const btnEnviar = document.querySelector('#btnEnviar')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const producto = Object.fromEntries(
    new FormData(e.target)
  )

  if (!producto.title)
    return

  if (!producto.price)
    return

  socket.emit('addProducto', producto)
  form.reset()
});

btnEnviar.addEventListener('click', () => {
  const message = document.querySelector('#message')
  const email = document.querySelector('#email')

  if (!message.value)
    return
  if (!email.value)
    return


  const payload = {
    message: message.value,
    email: email.value,
    date: new Date().toUTCString()
  }

  socket.emit('addChat', payload)
  message.value = ''
  email.value = ''
})

socket.on('productos', async (payload) => {
  const productos = document.querySelector('#productos')
  await PlantillaRender(productos, 'tabla', payload)
})

socket.on('chats', async (payload) => {
  const chats = document.querySelector('#list-chat')
  await PlantillaRender(chats, 'lista', payload)
})

const PlantillaRender = async (elementDom, namePlantilla, content) => {
  const plantilla = await fetch(`../plantillas/${namePlantilla}.handlebars`).then(resp => resp.text())
  const functionTemplate = Handlebars.compile(plantilla)
  const html = functionTemplate({ content })
  elementDom.innerHTML = html
}
