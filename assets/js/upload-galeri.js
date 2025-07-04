import { supabase } from './supabaseClient.js'

const galeriForm = document.getElementById("galeriForm")
const galeriList = document.getElementById("galeriList")

// Upload Galeri
galeriForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const imageFile = document.getElementById("image").files[0]

  if (!imageFile) return alert("Pilih gambar terlebih dahulu.")

  const fileExt = imageFile.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  // Upload ke bucket
  let { error: uploadError } = await supabase.storage.from("galeri").upload(filePath, imageFile)

  if (uploadError) return alert("Gagal upload gambar.")

  const { data: { publicUrl } } = supabase.storage.from("galeri").getPublicUrl(filePath)

  const { error } = await supabase.from("galeri").insert([
    { title, description, image_url: publicUrl }
  ])

  if (error) return alert("Gagal menyimpan ke database.")
  
  galeriForm.reset()
  alert("Upload berhasil!")
  loadGaleri()
})

// Load Galeri
async function loadGaleri() {
  const { data, error } = await supabase.from("galeri").select("*").order("id", { ascending: false })
  if (error) return alert("Gagal memuat galeri.")

  galeriList.innerHTML = ""
  data.forEach(item => {
    const el = document.createElement("div")
    el.className = "gallery-item"
    el.innerHTML = `
      <img src="${item.image_url}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <button class="delete-btn" data-id="${item.id}" data-image="${item.image_url}">Hapus</button>
    `
    galeriList.appendChild(el)
  })
}

// Hapus Galeri
galeriList.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return

  const id = e.target.dataset.id
  const imageUrl = e.target.dataset.image
  const fileName = imageUrl.split("/").pop()

  if (!confirm("Yakin ingin menghapus?")) return

  await supabase.storage.from("galeri").remove([fileName])
  await supabase.from("galeri").delete().eq("id", id)
  alert("Galeri dihapus.")
  loadGaleri()
})

// Initial Load
loadGaleri()
