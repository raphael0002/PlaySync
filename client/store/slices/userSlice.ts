import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "@/features/auth/auth.types";
import { removeCookie } from "@/lib/cookieUtils";

interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      removeCookie("token");
      removeCookie("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
