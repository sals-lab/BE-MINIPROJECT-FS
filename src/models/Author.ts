import { model, Schema } from "mongoose";
const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const Author = model("Author", authorSchema);

export default Author;
