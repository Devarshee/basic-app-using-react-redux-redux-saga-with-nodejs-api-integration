var aMongoose = global.theMongoose;

let Item = new aMongoose.Schema(
  {
    itemId: { type: Number, required: true, unique: true },
    itemName: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    uom: { type: String, required: true }
  },

  {
    collection: "item"
  }
);

var self = (module.exports = aMongoose.model("Item", Item));
