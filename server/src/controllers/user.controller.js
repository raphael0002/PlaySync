import { uploadImage } from "../services/image.service.js";
import ApiResponse from "../utils/api-response.js";
import { OK, CREATED } from "../utils/status-code.js";
import * as StatusCodes from "../utils/status-code.js";
import * as userService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: { users },
  });
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "User retrieved successfully",
    data: { user },
  });
};

export const createUser = async (req, res) => {
  let profileImage = null;
  if (req.file) {
    const { url } = await uploadImage(
      req.file,
      "users",
      `user_${Date.now()}`
    );
    profileImage = url;
  }
  const user = await userService.createUser({
    ...req.body,
    profileImage,
  });
  ApiResponse.send(res, {
    code: CREATED,
    message: "User created successfully",
    data: { user },
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  let profileImage = req.body.profileImage || null;
  if (req.file) {
    const { url } = await uploadImage(
      req.file,
      "users",
      `user_${id}_${Date.now()}`
    );
    profileImage = url;
  }
  const user = await userService.updateUserById(id, {
    ...req.body,
    profileImage,
  });
  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "User updated successfully",
    data: { user },
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteUserById(id);
  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "User deleted successfully",
    data: { user },
  });
};
