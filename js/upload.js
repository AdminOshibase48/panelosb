import { supabase } from './supabaseClient.js'

// HANDLE UPLOAD FORM
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const type = document.getElementById('type').value
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const imageFile = document.getElementById('image').files[0]

  let image_url = ''

  // Upload gambar jika ada
  if (imageFile) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error: uploadError } = await supabase
      .storage
      .from('uploads') // nama bucket kamu
      .upload(fileName, imageFile)

    if (uploadError) {
      alert('Gagal upload gambar: ' + uploadError.message)
      return
    }

    image_url = supabase.storage.from('uploads').getPublicUrl(fileName).data.publicUrl
  }

  // Insert ke tabel
  const { error } = await supabase
    .from(type) // galeri / berita / jadwal
    .insert([{ title, description, image_url }])

  if (error) {
    alert('Upload gagal: ' + error.message)
  } else {
    alert('Upload berhasil!')
    document.getElementById('uploadForm').reset()
  }
})

// HANDLE LOGOUT BUTTON
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert('Logout gagal: ' + error.message)
  } else {
    alert('Berhasil logout')
    window.location.href = '/admin/login.html'
  }
})
