var aMongoose = global.theMongoose;

const inOrder = {
  type: aMongoose.Schema.Types.ObjectId,
  ref: "Order",
  required: true
};

let Items = new aMongoose.Schema(
  {
    orderId: inOrder,
    itemId: { type: Number, required: true, unique: true },
    itemName: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    uom: { type: String, required: true }
  },

  {
    collection: "items"
  }
);

var self = (module.exports = aMongoose.model("Items", Items));
