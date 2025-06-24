import ApiResponse from "../utils/api-response.js";
import * as StatusCodes from "../utils/status-code.js";
import * as userService from "../services/user.service.js";

const getAllUsers = async (req, res, next) => {
  const users = await userService.getAllUsers();

  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: { users },
  });
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserbyId(id);

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: "User retrieved successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userService.updateUserById(
      id,
      req.body
    );
    if (!user) {
      throw new Error("User not found");
    }

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: "User Updated successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userService.deleteUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: "User deleted successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUser, updateUser, deleteUser };
