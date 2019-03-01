/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const express = require('express');

const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// GET ALL
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().select('_id productId quantity');
    const response = {
      count: orders.length,
      orders: orders.map(order => ({
        productId: order.productId,
        quantity: order.quantity,
        _id: order._id,
        request: {
          type: 'GET',
          url: `http://localhost:5000/orders/${order._id}`,
        },
      })),
    };
    orders.length >= 1 ? (
      res.status(200).json(response)
    ) : (
      res.status(200).json({
        message: 'There are no orders yet',
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
      productId,
      quantity,
    } = req.body;
    const foundProduct = await Product.findById(productId);
    if (foundProduct) {
      const newOrder = new Order({
        productId,
        quantity,
      });
      await newOrder.save();
      res.status(201).json({
        message: 'New order created',
        createdOrder: {
          _id: newOrder._id,
          name: newOrder.name,
          price: newOrder.price,
          request: {
            type: 'GET',
            url: `http://localhost:5000/orders/${newOrder._id}`,
          },
        },
      });
    } else {
      res.status(404).json({
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
  }
});
// GET ONE
router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id).select('_id productId quantity');
    order ? (
      res.status(200).json(order)
    ) : (
      res.status(404).json({
        message: 'There is no order with this ID',
      })
    );
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
  }
});

// DELETE ONE
router.delete('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(id);
    deletedOrder ? (
      res.status(200).json({
        message: 'Deleted order!',
        request: {
          type: 'POST',
          url: 'http://localhost:5000/orders/',
          body: {
            productId: 'ID',
            quantity: 'Number',
          },
        },
      })
    ) : (
      res.status(404).json({ message: 'There is no order with that ID' }));
  } catch (error) {
    res.status(500).json({
      message: 'There is a something wrong',
      error,
    });
  }
});
module.exports = router;
