document.addEventListener("DOMContentLoaded", function() {
    const harga = {
      1: 25000,
      2: 30000,
      3: 20000
    };
  
    const jumlah = {
      1: 0,
      2: 0,
      3: 0
    };
  
    const namaMenu = {
      1: "Nasi Goreng",
      2: "Ayam Bakar",
      3: "Soto Ayam"
    };
  
    const whatsappNumber = "6285370883257"; // Ganti dengan nomor yang sesuai
  
    function updateTampilan() {
      let totalHarga = 0;
      for (let id in jumlah) {
        document.getElementById("jumlah" + id).innerText = jumlah[id];
        totalHarga += jumlah[id] * harga[id];
      }
      document.getElementById("total").innerText = totalHarga.toLocaleString();
    }
  
    window.tambah = function(id) {
      if (jumlah[id] >= 0) {
        jumlah[id]++;
        updateTampilan();
      }
    };
  
    window.kurangi = function(id) {
      if (jumlah[id] > 0) {
        jumlah[id]--;
        updateTampilan();
      }
    };
  
    window.pesan = function() {
      const alamat = document.getElementById("alamat").value.trim();
      if (!alamat) {
        alert("Masukkan alamat pengiriman!");
        return;
      }
  
      const pesananList = Object.keys(jumlah)
        .filter(id => jumlah[id] > 0)
        .map(id => `${jumlah[id]}x ${namaMenu[id]} (Rp ${harga[id].toLocaleString()})`)
        .join("\n");
  
      if (!pesananList) {
        alert("Pilih minimal satu menu sebelum memesan!");
        return;
      }
  
      const totalHarga = Object.keys(jumlah).reduce((total, id) => total + jumlah[id] * harga[id], 0);
      const message = `Halo, saya ingin memesan:\n${pesananList}\n\nTotal: Rp ${totalHarga.toLocaleString()}\nAlamat: ${alamat}`;
  
      try {
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.location.href = whatsappURL;
      } catch (error) {
        console.error(error);
        alert("Gagal mengirimkan pesanan. Silakan coba lagi.");
      }
    };
  
    window.reset = function() {
      for (let id in jumlah) {
        jumlah[id] = 0;
      }
      updateTampilan();
    };
  });
  