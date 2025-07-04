import { supabase } from './supabaseClient.js'

document.getElementById('galeriForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const imageFile = document.getElementById('image').files[0]

  const fileName = `${Date.now()}-${imageFile.name}`
  const { data: imageData, error: uploadError } = await supabase
    .storage
    .from('galeri')
    .upload(fileName, imageFile)

  if (uploadError) {
    return alert('Gagal upload gambar:', uploadError.message)
  }

  const imageUrl = `${supabase.storage.from('galeri').getPublicUrl(fileName).data.publicUrl}`

  const { error } = await supabase.from('galeri').insert([{ title, description, image_url: imageUrl }])
  if (error) {
    alert('Gagal menyimpan galeri:', error.message)
  } else {
    alert('Berhasil upload galeri!')
    document.getElementById('galeriForm').reset()
  }
})
