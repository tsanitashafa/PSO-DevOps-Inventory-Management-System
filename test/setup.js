const mongoose = require('mongoose');
const path = require('path');

// Mengarahkan pembacaan .env secara aman dari folder utama (root)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

beforeAll(async () => {
    // Membaca JWT_SECRET dari .env. Jika tidak ada, gunakan default 'devops_secret' khusus untuk testing lokal
    process.env.JWT_SECRET = process.env.JWT_SECRET || "devops_secret"; 
    process.env.NODE_ENV = 'test';

    // Mengambil URL koneksi secara aman dari file .env
    const url = process.env.MONGO_URI;
    
    // Validasi: Jika MONGO_URI lupa diisi di .env, proses test langsung dihentikan dengan error yang jelas
    if (!url) {
        throw new Error(
            "\n❌ ERROR: MONGO_URI tidak ditemukan di file .env Anda!\n" +
            "Pastikan Anda sudah membuat file .env dan mengisinya dengan benar.\n"
        );
    }
    
    if (mongoose.connection.readyState === 0) {
        jest.setTimeout(30000); 
        await mongoose.connect(url);
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});
