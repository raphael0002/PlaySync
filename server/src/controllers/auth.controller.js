import * as authService from '../services/auth.service.js';
import * as  StatusCodes  from '../utils/status-code.js';
import ApiResponse from '../utils/api-response.js';

const signUp = async (req, res) => {

  const users = await authService.signup(req.body);

  ApiResponse.send(res, {
    code: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: { users },
  });
};

const logIn = async (req, res) => {

  const { user, token } = await authService.login(req.body);
  console.log('Login successful:', req.body.email);

  ApiResponse.send(res, {
    code: StatusCodes.OK,
    message: 'Login successful',
    data: { user, token },
  });
};

export { signUp, logIn };
