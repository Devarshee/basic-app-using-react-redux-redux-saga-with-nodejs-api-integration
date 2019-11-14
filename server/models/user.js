var aMongoose = global.theMongoose;

const inOrder = {
  type: aMongoose.Schema.Types.ObjectId,
  ref: "Order",
  required: true,
  default: []
};

let User = new aMongoose.Schema(
  {
    userId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    order: [inOrder]
  },
  {
    collection: "user"
  }
);

var self = (module.exports = aMongoose.model("User", User));
