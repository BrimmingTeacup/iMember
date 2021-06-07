window.addEventListener('DOMContentLoaded', (event) => {
  const demo = document.getElementById('demo')
  const password = document.getElementById('password')
  const email = document.getElementById('email')

  demo.addEventListener('click', (event) => {
    email.value = 'demo@demo.com'
    password.value = 'Pas5w0rd!'
  })
})
