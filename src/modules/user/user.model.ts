import { Schema, model } from "mongoose";
import { Order, TUser } from "./user.interface";

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [orderSchema],
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.post("findOne", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.post("findOneAndUpdate", function (doc, next) {
  doc.password = "";
  next();
});

export const userModel = model<TUser>("User", userSchema);
