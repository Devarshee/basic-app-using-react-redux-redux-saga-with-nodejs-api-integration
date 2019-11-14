const express = require("express");
const aRouter = express.Router();
const OrderModel = require("../models/order");
const Joi = require("joi");
const validate = require("express-validation");

aRouter.get("/api/order", async function(req, res) {
  try {
    let orders = await OrderModel.find()
      .populate("items")
      .lean();
    res.status(200).json({ message: "Get orders successfully", data: orders });
  } catch (err) {
    handleErr(res, err);
  }
});

aRouter.get(
  "/api/order/findItemByOrderNo/:_id",
  validate({
    params: {
      _id: Joi.string().required()
    }
  }),
  async function(req, res) {
    try {
      let order = await OrderModel.findById(req.params._id)
        .populate("items")
        .lean();
      res.status(200).json({
        message: "Get items for order successfully",
        data: order
        // order.items
      });
    } catch (err) {
      handleErr(res, err);
    }
  }
);

var self = (module.exports = aRouter);
