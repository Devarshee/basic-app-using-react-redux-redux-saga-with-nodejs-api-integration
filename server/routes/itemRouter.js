const express = require("express");
const aRouter = express.Router();
const ItemModel = require("../models/item");
const OrderModel = require("../models/order");
const ItemsModel = require("../models/items");
const Joi = require("joi");
const validate = require("express-validation");

aRouter.get("/api/item", async function(req, res) {
  try {
    let item = await ItemModel.find().lean();
    res.status(200).json({ message: "Items fetched successfully", data: item });
  } catch (err) {
    handleErr(res, err);
  }
});

aRouter.delete(
  "/api/item/removeItem/:_id",
  validate({
    params: {
      _id: Joi.string().required()
    }
  }),
  async function(req, res) {
    try {
      await ItemsModel.findByIdAndDelete(req.params._id, function(err) {
        if (err) return err;
        let deletedItem = {
          _id: req.params._id
        };
        res
          .status(200)
          .json({ message: "Item is deleted successfully", data: deletedItem });
      });
    } catch (err) {
      handleErr(res, err);
    }
  }
);

aRouter.put(
  "/api/item/updateItem/:_id",
  validate({
    params: {
      _id: Joi.string().required()
    }
  }),
  async function(req, res) {
    try {
      let updatedItem = await ItemsModel.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      ).lean();
      res
        .status(200)
        .json({ message: "Item is updated successfully", data: updatedItem });
    } catch (err) {
      handleErr(res, err);
    }
  }
);

aRouter.post(
  "/api/item/addItemToOrder",
  // validate({
  //   body: {
  //     orderItem: {
  //       items: Joi.array().required(),
  //       orderId: Joi.string().required()
  //     }
  //   }
  // }),
  async function(req, res) {
    try {
      let itemObj;
      let newItemObj;
      for (let i = 0; i < req.body.orderItem.items.length; i++) {
        itemObj = await ItemModel.findById(req.body.orderItem.items[i]);
        newItemObj = await ItemsModel.create({
          orderId: req.body.orderItem.orderId,
          itemId: itemObj.itemId,
          itemName: itemObj.itemName,
          cost: itemObj.cost,
          quantity: itemObj.quantity,
          description: itemObj.description,
          uom: itemObj.uom
        });
        await OrderModel.findByIdAndUpdate(
          { _id: req.body.orderItem.orderId },
          {
            $push: { items: newItemObj }
          }
        );
      }
      res.status(200).json({
        message: "Items added to the order successfully",
        data: newItemObj
      });
    } catch (err) {
      handleErr(res, err);
    }
  }
);

var self = (module.exports = aRouter);
