const mongoose = require('mongoose');
const path = require('path');

<<<<<<< HEAD
// Mengarahkan pembacaan env secara aman
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

beforeAll(async () => {
    // Memaksa nilai rahasia sinkron secara absolut untuk mematikan error 401
    process.env.JWT_SECRET = "devops_secret"; 
    process.env.NODE_ENV = 'test';

    const atlasURI = "mongodb+srv://5026231088_db_user:bismillahpsoa@pso.imvmim0.mongodb.net/test?retryWrites=true&w=majority&appName=pso";
    const url = process.env.MONGO_URI || atlasURI;
=======
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
>>>>>>> cb0cc850572187d3ef269f885d071f4a8f9c92f9
    
    if (mongoose.connection.readyState === 0) {
        jest.setTimeout(30000); 
        await mongoose.connect(url);
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> cb0cc850572187d3ef269f885d071f4a8f9c92f9
