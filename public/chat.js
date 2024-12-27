const socket = io('http://localhost:3000');
socket.on('connect', () => {
    console.log("connected succesfully")
})

const btn = document.getElementById('send')
const message = document.getElementById('message')
const handle = document.getElementById('handle')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

socket.on('chat', (data) => {
    feedback.innerHTML = ''
    message.value = ''
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})