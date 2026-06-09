const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });

beforeAll(async () => {
    const atlasURI = "mongodb+srv://5026231088_db_user:bismillahpsoa@pso.imvmim0.mongodb.net/test?retryWrites=true&w=majority&appName=pso";
    const url = process.env.MONGO_URI || atlasURI;
    
    if (mongoose.connection.readyState === 0) {
        jest.setTimeout(20000); // Naikkan ke 20 detik jika koneksi Atlas agak lambat
        await mongoose.connect(url);
        
        // ⚠️ PEMBERSIHAN DATA: Hapus user lama agar tidak duplikat saat Registration test
        const collections = mongoose.connection.collections;
        if (collections['users']) {
            await collections['users'].deleteMany({ email: "admin@mail.com" });
        }
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});