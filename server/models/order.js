var aMongoose = global.theMongoose;

const dUDate = {
  type: Number,
  default: function() {
    return Math.round(Date.now() / 1000);
  },
  required: true
};

const inItem = {
  type: aMongoose.Schema.Types.ObjectId,
  ref: "Items",
  required: true,
  default: []
};

let Order = new aMongoose.Schema(
  {
    orderNumber: { type: Number, required: true, unique: true },
    date: dUDate,
    zip: { type: Number, required: true },
    st: { type: String, required: true },
    createdBy: { type: String, required: true },
    picked: { type: String, required: true },
    shipped: { type: String, required: true },
    items: [inItem]
  },

  {
    strict: true,
    collection: "order"
  }
);

var self = (module.exports = aMongoose.model("Order", Order));
