/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const express = require('express');


const router = express.Router();
const Product = require('../models/product');
// GET ALL
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().select('_id name price');
    const response = {
      count: products.length,
      products: products.map(product => ({
        name: product.name,
        price: product.price,
        _id: product._id,
        request: {
          type: 'GET',
          url: `http://localhost:5000/products/${product._id}`,
        },
      })),
    };
    products.length >= 1 ? (
      res.status(200).json(response)
    ) : (
      res.status(200).json({
        message: 'There are no products yet',
      })
    );
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
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
    console.log(newProduct);
    res.status(201).json({
      message: 'New product created',
      createdProduct: {
        _id: newProduct._id,
        name: newProduct.name,
        price: newProduct.price,
        request: {
          type: 'GET',
          url: `http://localhost:5000/products/${newProduct._id}`,
        },

      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
  }
});
// GET ONE
router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id).select('_id name price');
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
      message: 'There is a something wrong',
      error,
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

    }).select('_id name price');
    res.status(200).json({
      message: ' Product Updated!',
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
  }
});
// DELETE ONE
router.delete('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(id);
    deletedProduct ? (
      res.status(200).json({
        message: 'Deleted Product!',
        request: {
          type: 'POST',
          url: 'http://localhost:5000/products/',
          body: {
            name: 'String',
            price: 'Number',
          },
        },
      })
    ) : (
      res.status(404).json({
        message: 'There is no product with this ID',
      })
    );
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
  }
});

module.exports = router;
