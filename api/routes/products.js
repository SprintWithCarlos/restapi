/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const express = require('express');


const router = express.Router();
const Product = require('../models/product');
// GET ALL
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    products.length >= 1 ? (
      res.status(200).json(products)
    ) : (
      res.status(200).json({
        message: 'There are no products yet',
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
});
// CREATE ONE
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      price,
    } = req.body;
    const newProduct = await new Product({
      name,
      price,
    });
    newProduct.save();
    res.status(201).json({
      message: 'New product created',
      newProduct,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ONE
router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    product ? (
      res.status(200).json({
        message: 'You have send an ID',
        product,
      })
    ) : (
      res.status(404).json({
        message: 'The product does not exist',
      })
    );
  } catch (error) {
    res.status(500).json({
      message: 'There is a wrong format for the ID',
    });
  }
});
// UPDATE ONE
router.patch('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const {
      name,
      price,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const updatedProduct = await Product.findOneAndUpdate(id, {
      name,
      price,
    }, () => {

    });
    res.status(200).json({
      message: ' Product Updated!',
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There is something wrong',
    });
  }
});
// DELETE ONE
router.delete('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const deletedProduct = await Product.deleteOne({
      id,
    });
    deletedProduct ? (
      res.status(200).json({
        message: 'Deleted Product!',
        deletedProduct,
      })
    ) : (
      res.status(404).json({
        message: 'There is no product with this ID',
      })
    );
  } catch (error) {
    res.status(500).json({
      message: 'There is a wrong format for the ID',
    });
  }
});

module.exports = router;
