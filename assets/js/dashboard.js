import { supabase } from './supabaseClient.js'

document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert('Logout gagal: ' + error.message)
  } else {
    alert('Logout berhasil')
    window.location.href = 'https://panelosb.netlify.app/' // ⬅ arahkan ke website utama
  }
})
