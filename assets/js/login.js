import { supabase } from './supabaseClient.js'

document.getElementById('loginBtn')?.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('Login gagal: ' + error.message)
  } else {
    alert('Login berhasil')
    window.location.href = 'dashboard.html'
  }
})
