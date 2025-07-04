import { supabase } from './supabaseClient.js'

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const type = document.getElementById('type').value
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const imageFile = document.getElementById('image').files[0]

  let image_url = ''

  // Jika ada gambar, upload ke bucket Supabase
  if (imageFile) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { data, error: uploadError } = await supabase
      .storage
      .from('uploads') // GANTI ke nama bucket kamu
      .upload(fileName, imageFile)

    if (uploadError) {
      alert('Gagal upload gambar.')
      return
    }
    image_url = supabase.storage.from('uploads').getPublicUrl(fileName).data.publicUrl
  }

  // Insert ke tabel yang sesuai
  const { error } = await supabase
    .from(type) // nama tabel: galeri, berita, atau jadwal
    .insert([{ title, description, image_url }])

  if (error) {
    alert('Upload gagal: ' + error.message)
  } else {
    alert('Upload berhasil!')
    document.getElementById('uploadForm').reset()
  }
})
