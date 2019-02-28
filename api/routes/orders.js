const express = require('express');

const router = express.Router();

// GET ALL
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Showing ALL orders',
  });
});
// CREATE ONE
router.post('/', (req, res, next) => {
  const {
    productId,
    quantity,
  } = req.body;
  const order = {
    productId,
    quantity,
  };
  res.status(201).json({
    message: 'Handling POST request to /orders',
    order,
  });
});
// GET ONE
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'You are reading a Product!',
    id,
  });
});

// DELETE ONE
router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'You deleted a Product!',
    id,
  });
});
module.exports = router;
