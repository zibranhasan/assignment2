import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await userModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await userModel.findOne({ userId });
  console.log(result);
  return result;
};

const updateUserFromDB = async (userId: string, body: TUser) => {
  const result = await userModel.findOneAndUpdate({ userId }, body, {
    new: true,
  });
  return result;
};
const deleteUserFromDB = async (userId: string) => {
  const result = await userModel.findOneAndDelete({ userId });
  return !result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
