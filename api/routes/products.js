const express = require('express');

const router = express.Router();
// GET ALL
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products',
  });
});
// CREATE ONE
router.post('/', (req, res, next) => {
  const { name, price } = req.body;
  const product = {
    name,
    price,
  };
  res.status(201).json({
    message: 'Handling POST request to /products',
    product,
  });
});
// GET ONE
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'You have discover the SPECIAL id!',
      id,
    });
  } else {
    res.status(200).json({
      message: 'You have send an ID',
    });
  }
});
// UPDATE ONE
router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated Product!',
  });
});
// DELETE ONE
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted Product!',
  });
});
module.exports = router;
