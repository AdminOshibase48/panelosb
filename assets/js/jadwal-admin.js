import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://nuvfnnxuxtthbryesliu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmZubnh1eHR0aGJyeWVzbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzk1NTYsImV4cCI6MjA2NzExNTU1Nn0.Om73FRiKvdlWpZS-hIXCIKznjkQ3A3X3k1n2IzGzRes' // Ganti dengan anon key kamu
);

const form = document.getElementById('jadwalForm');
const list = document.getElementById('jadwal-list');
const toast = document.getElementById('toast');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama_kegiatan = document.getElementById('nama_kegiatan').value;
  const tanggal = document.getElementById('tanggal').value;

  const { error } = await supabase.from('jadwal').insert([{ nama_kegiatan, tanggal }]);

  if (error) {
    alert('Gagal menambahkan jadwal: ' + error.message);
    return;
  }

  form.reset();
  showToast();
  loadJadwal();
});

async function loadJadwal() {
  const { data, error } = await supabase.from('jadwal').select('*').order('tanggal', { ascending: true });
  if (error) return (list.innerHTML = '<p>Gagal memuat jadwal.</p>');

  list.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <button class="delete-btn" onclick="hapusJadwal(${item.id})">Hapus</button>
      <h4>${item.nama_kegiatan}</h4>
      <p>${new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
    `;
    list.appendChild(div);
  });
}

window.hapusJadwal = async function (id) {
  const confirmDelete = confirm("Yakin ingin menghapus jadwal ini?");
  if (!confirmDelete) return;

  const { error } = await supabase.from('jadwal').delete().eq('id', id);
  if (error) return alert("Gagal menghapus: " + error.message);

  loadJadwal();
};

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

loadJadwal();
