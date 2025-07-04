import { supabase } from './supabaseClient.js'

document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert('Logout gagal: ' + error.message)
  } else {
    window.location.href = 'index.html'
  }
})
