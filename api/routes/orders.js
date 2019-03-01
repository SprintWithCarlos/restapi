/* eslint-disable no-unused-expressions */
const express = require('express');

const router = express.Router();
const Order = require('../models/order');

// GET ALL
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find();
    orders.length >= 1 ? (
      res.status(200).json(orders)
    ) : (
      res.status(200).json({
        message: 'There are no orders yet',
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
      productId,
      quantity,
    } = req.body;
    const newOrder = new Order({
      productId,
      quantity,
    });
    await newOrder.save();
    res.status(201).json({
      message: 'Handling POST request to /orders',
      newOrder,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ONE
router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id);
    order ? (
      res.status(200).json(order)
    ) : (
      res.status(404).json({
        message: 'There is no order with this ID',
      })
    );
  } catch (error) {
    res.status(500).json({
      message: 'There is a wrong format for the ID',
    });
  }
});

// DELETE ONE
router.delete('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(id);
    deletedOrder ? (
      res.status(200).json(deletedOrder)
    ) : (
      res.status(404).json({ message: 'There is no order with that ID' }));
  } catch (error) {
    res.status(500).json({
      message: 'There is a wrong format for the ID',
    });
  }
});
module.exports = router;
