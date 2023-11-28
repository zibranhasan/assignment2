import Joi from "joi";
import { Order, TUser } from "./user.interface";

export const userSchemaValidation = Joi.object<TUser>({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  orders: Joi.array().items(
    Joi.object<Order>({
      productName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    })
  ),
});
