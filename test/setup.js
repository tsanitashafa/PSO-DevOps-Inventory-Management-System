const mongoose = require('mongoose');
const path = require('path');

// Mengarahkan pembacaan env secara aman
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

beforeAll(async () => {
    // Memaksa nilai rahasia sinkron secara absolut untuk mematikan error 401
    process.env.JWT_SECRET = "devops_secret"; 
    process.env.NODE_ENV = 'test';

    const atlasURI = "mongodb+srv://5026231088_db_user:bismillahpsoa@pso.imvmim0.mongodb.net/test?retryWrites=true&w=majority&appName=pso";
    const url = process.env.MONGO_URI || atlasURI;
    
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