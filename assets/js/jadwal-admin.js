<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  const supabase = createClient(
    'https://[PROJECT_ID].supabase.co',
    '[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmZubnh1eHR0aGJyeWVzbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzk1NTYsImV4cCI6MjA2NzExNTU1Nn0.Om73FRiKvdlWpZS-hIXCIKznjkQ3A3X3k1n2IzGzRes]'
  );

  const form = document.getElementById('jadwalForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama_kegiatan = document.getElementById('nama_kegiatan').value;
    const tanggalInput = document.getElementById('tanggal').value;
    const tanggal = new Date(tanggalInput).toISOString();

    const { error } = await supabase
      .from('jadwal')
      .insert([{ nama_kegiatan, tanggal }]);

    if (error) {
      alert("Gagal simpan ke database: " + error.message);
    } else {
      alert("Jadwal berhasil ditambahkan!");
      form.reset();
      // Optional: Panggil fungsi loadJadwal() kalau ingin auto refresh list
    }
  });
</script>
