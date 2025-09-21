require('dotenv').config();
const express = require("express")
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order'); 

const app = express()
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('E-Commerce API running'));

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));