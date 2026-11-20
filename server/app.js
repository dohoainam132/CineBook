// Cấu hình express

const express = require('express');
const cors = require('cors');

const app = express();

// Cho phép đọc JSON
app.use(express.json());

// Cho phép Frontend gọi Backend
app.use(cors());

// API kiểm tra Server
app.get('/', (req, res) => {
    res.send('CineBook Server is running!');
});

// Kiểm tra API
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'CineBook API is working!'
    });
});

module.exports = app;
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});