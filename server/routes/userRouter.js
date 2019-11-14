const express = require("express");
const aRouter = express.Router();
const validate = require("express-validation");
const UserModel = require("../models/user");
const Joi = require("joi");

aRouter.get(
  "/api/user/:id",
  validate({
    params: {
      id: Joi.number().required()
    }
  }),
  async function(req, res) {
    try {
      let user = await UserModel.findOne({ userId: req.params.id })
        .populate("order")
        .lean();
      res.status(200).json({ message: "Get user successfully", data: user });
    } catch (err) {
      handleErr(res, err);
    }
  }
);

var self = (module.exports = aRouter);
