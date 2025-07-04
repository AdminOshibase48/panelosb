import { supabase } from './supabaseClient.js'

const galeriList = document.getElementById("galeriList")

async function loadGaleri() {
  const { data, error } = await supabase.from("galeri").select("*")
  if (error) return alert("Gagal memuat galeri: " + error.message)

  galeriList.innerHTML = ""

  data.forEach(item => {
    const el = document.createElement("div")
    el.className = "gallery-item"
    el.innerHTML = `
      <img src="${item.image_url}" alt="${item.title}" />
      <div class="gallery-title">${item.title}</div>
      <div class="gallery-desc">${item.description}</div>
      <button class="delete-btn" data-id="${item.id}" data-image="${item.image_url}">Hapus</button>
    `
    galeriList.appendChild(el)
  })
}

async function deleteGaleri(id, imageUrl) {
  const confirmDelete = confirm("Yakin ingin menghapus konten ini?")
  if (!confirmDelete) return

  // Ekstrak path dari URL gambar
  const filePath = imageUrl.split("/").slice(-1)[0]

  // Hapus gambar dari storage
  await supabase.storage.from("galeri").remove([filePath])

  // Hapus data dari table
  const { error } = await supabase.from("galeri").delete().eq("id", id)
  if (error) return alert("Gagal menghapus galeri: " + error.message)

  alert("Galeri berhasil dihapus!")
  loadGaleri()
}

galeriList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id
    const imageUrl = e.target.dataset.image
    deleteGaleri(id, imageUrl)
  }
})

// Load saat halaman dibuka
loadGaleri()
