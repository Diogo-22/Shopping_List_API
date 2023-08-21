const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  userids: [
    {
      userid: {
        type: String,
        required: true,
      },
    },
  ],

  listname: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        //required: true,
      },
      numid: {
        type: Number,
        //required: true,
      },
      checked: {
        type: Boolean,
        //required: true,
      },
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
