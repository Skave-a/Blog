import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/utiles/axios";
import { RootState } from "@/redux/store";

export interface AuthState {
  user: User | null | string;
  token: string | null;
  isLoading: boolean;
  status: string | null;
}

interface RegisterUserArgs {
  usermail: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

interface RegisterUserArgs {
  usermail: string;
  password: string;
}

interface LoginUserArgs {
  usermail: string;
  password: string;
}

export interface User {
  createdAt: string;
  password: string;
  posts: string[];
  updatedAt: string;
  usermail: string;
  __v: number;
  _id: string;
}

export interface AuthPayload {
  message: string;
  user: string | null;
  token: string | null;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ usermail, password }: RegisterUserArgs) => {
    try {
      const { data } = await axios.post("/auth/register", {
        usermail,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk<AuthPayload, LoginUserArgs>(
  "auth/loginUser",
  async ({ usermail, password }: RegisterUserArgs) => {
    try {
      const { data } = await axios.post("/auth/login", {
        usermail,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<any, string>) => {
        state.isLoading = false;
        state.status = action.payload.message;
      }
    );
    // Login user
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(
      loginUser.rejected,
      (state, action: PayloadAction<any, string>) => {
        state.isLoading = false;
        state.status = action.payload.message;
      }
    );
    // Проверка авторизации
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(
      getMe.rejected,
      (state, action: PayloadAction<any, string>) => {
        state.isLoading = false;
        state.status = action.payload.message;
      }
    );
  },
});

type CheckIsAuthResult = {
  auth: boolean;
  isLoading: boolean;
};

let previousResult: CheckIsAuthResult | null = null;

export const checkIsAuth = (state: RootState) => {
  if (
    previousResult !== null &&
    previousResult.auth === Boolean(state.auth.token) &&
    previousResult.isLoading === state.auth.isLoading
  ) {
    return previousResult;
  }

  const result = {
    auth: Boolean(state.auth.token),
    isLoading: state.auth.isLoading,
  };

  previousResult = result;
  return result;
};

export const { logout } = authSlice.actions;
export default authSlice.reducer;
