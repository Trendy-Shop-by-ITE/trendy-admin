import axios from "axios";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  error: false,
  filter: {
    ///// input field
  },
  // user: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    hasError(state, action) {
      state.isLoading = false;
      action.filter = action.payload;
    },
    setFilterSuccess(state, actions) {
      state.isLoading = false;
      state.filter = actions.payload;
    },
    signUp(state, actions) {
      state.isLoading = false;
      state.user = actions.payload;
    },
  },
});

export const createUser = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.post(`endpoint`, params);
    if (response?.data) {
    //   dispatch(signUp(response?.data));
    }
    console.log("signup", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const { startLoading, stopLoading, hasError, setFilterSuccess } =
  authSlice.actions;
export default authSlice.reducer;
