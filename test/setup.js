const mongoose = require('mongoose');
const path = require('path');

// Pastikan pembacaan file .env.test mengarah ke folder root secara absolut
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });

beforeAll(async () => {
    // Gunakan URI Atlas kamu langsung sebagai cadangan jika env tidak terbaca
    const atlasURI = "mongodb+srv://5026231088_db_user:bismillahpsoa@pso.imvmim0.mongodb.net/test?retryWrites=true&w=majority&appName=pso";
    const url = process.env.MONGO_URI || atlasURI;
    
    if (mongoose.connection.readyState === 0) {
        // Beri waktu tambahan ke Jest (15 detik) karena koneksi ke Cloud Atlas butuh waktu internet
        jest.setTimeout(15000); 
        await mongoose.connect(url);
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});