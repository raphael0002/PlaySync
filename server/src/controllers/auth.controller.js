import * as authService from "../services/auth.service.js";
import * as StatusCodes from "../utils/status-code.js";
import ApiResponse from "../utils/api-response.js";

const signUp = async (req, res) => {
  const { user, token } = await authService.signup(
    req.body
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
    path: "/",
  });
  res.cookie("user", JSON.stringify(user), {
    httpOnly: false, // Client-accessible
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
    path: "/",
  });
  ApiResponse.send(res, {
    code: StatusCodes.CREATED,
    message: "User registered successfully",
    data: { user },
  });
};

const logIn = async (req, res) => {
  const { user, token } = await authService.login(req.body);
  console.log("Login successful:", req.body.email);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
    path: "/",
  });
  res.cookie("user", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
    path: "/",
  });
  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "User found",
    data: { user },
  });
};

const verifyToken = async (req, res) => {
  const user = req.user; // Set by authMiddleware
  res.cookie("user", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
    path: "/",
  });
  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: "Token verified",
    data: { user },
  });
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });
    res.cookie("user", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });
    ApiResponse.send(res, {
      code: StatusCodes.OK,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    ApiResponse.send(res, {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Logout failed",
    });
  }
};

export { signUp, logIn, verifyToken, logout };
