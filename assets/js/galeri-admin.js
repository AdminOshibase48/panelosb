import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://nuvfnnxuxtthbryesliu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmZubnh1eHR0aGJyeWVzbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzk1NTYsImV4cCI6MjA2NzExNTU1Nn0.Om73FRiKvdlWpZS-hIXCIKznjkQ3A3X3k1n2IzGzRes' // GANTI!
);

const gallery = document.getElementById('gallery-grid');
const form = document.getElementById('uploadForm');
const toast = document.getElementById('toast');

form.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const file = document.getElementById('image').files[0];
  const fileName = `${Date.now()}_${file.name}`;

  const { error: uploadError } = await supabase.storage.from('galeri').upload(fileName, file);
  if (uploadError) return alert("Upload gagal: " + uploadError.message);

  const { data: publicURL } = supabase.storage.from('galeri').getPublicUrl(fileName);
  const { error: insertError } = await supabase.from('galeri').insert([{ title, image_url: publicURL.publicUrl }]);
  if (insertError) return alert("Gagal simpan DB: " + insertError.message);

  form.reset();
  showToast("Upload berhasil!");
  loadGaleri();
};

async function loadGaleri() {
  const { data, error } = await supabase.from('galeri').select('*').order('created_at', { ascending: false });
  if (error) return alert("Gagal memuat galeri");

  gallery.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <button class="delete-btn" onclick="hapusFoto(${item.id})">Hapus</button>
      <img src="${item.image_url}" alt="${item.title}">
      <p><strong>${item.title}</strong></p>
    `;
    gallery.appendChild(card);
  });
}

window.hapusFoto = async function (id) {
  const konfirmasi = confirm("Hapus gambar ini?");
  if (!konfirmasi) return;

  const { error } = await supabase.from('galeri').delete().eq('id', id);
  if (error) return alert("Gagal hapus: " + error.message);

  showToast("Gambar dihapus!");
  loadGaleri();
};

window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = '../index.html';
};

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

loadGaleri();
