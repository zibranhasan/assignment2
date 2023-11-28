import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { userSchemaValidation } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { value } = userSchemaValidation.validate(user);
    const result = await UserServices.createUserIntoDB(value);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched succefully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.updateUserFromDB(userId, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }

    return res.json({
      success: true,
      message: "User update successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: {
        code: 500,
        description: "Internal server error",
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.deleteUserFromDB(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }

    return res.json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: {
        code: 500,
        description: "Internal server error",
      },
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.updateOrderFromDB(userId, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }

    return res.json({
      success: true,
      message: "Order update successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: {
        code: 500,
        description: "Internal server error",
      },
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleOrderFromDB(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }
    return res.json({
      success: true,
      message: "Orders fetched successfully",
      data: {
        orders: result.orders || [],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: {
        code: 500,
        description: "Internal server error",
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getSingleOrder,
};
