require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

// Database

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
}).then(() => console.log('La base de datos está conectada')).catch(err => console.error(err));
mongoose.set('useFindAndModify', false);
// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error Handling

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
