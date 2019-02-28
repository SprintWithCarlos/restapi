const express = require('express');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();
// Middlewares
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req, res, next) => {
  res.status(200).json({
    message: 'it works!',
  });
});

module.exports = app;
