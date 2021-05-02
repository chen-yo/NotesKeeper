import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const tryAutoLogin = "TRY_AUTO_LOGIN";
const tryAutoLoginStart = createAction(`${tryAutoLogin}_START`);
const tryAutoLoginSuccess = createAction(`${tryAutoLogin}_SUCCESS`);
const tryAutoLoginFail = createAction(`${tryAutoLogin}_FAIL`);

const userLogin = "USER_LOGIN";
const userLoginStart = createAction(`${userLogin}_START`);
const userLoginSuccess = createAction(`${userLogin}_SUCCESS`);
const userLoginFail = createAction(`${userLogin}_FAIL`);

const userRegister = "USER_REGISTER";
const userRegisterStart = createAction(`${userRegister}_START`);
const userRegisterSuccess = createAction(`${userRegister}_SUCCESS`);
const userRegisterFail = createAction(`${userRegister}_FAIL`);

const reducer = createReducer({ user: null }, (builder) => {
  builder.addCase(tryAutoLoginSuccess, (state, action) => {
    const user = action.payload;
    state.user = user;
  });

  builder.addCase(userLoginSuccess, (state, action) => {
    const user = action.payload;
    state.user = user;
  });

  builder.addCase(userRegisterSuccess, (state, action) => {
    const user = action.payload;
    state.user = user;
  });
});
// export const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: null,
//         loading: true //try auto login
//     },
//     reducers: {
//         setUser: (state, action) => {
//             const user = action.payload
//             state.user =  user
//             state.loading = false
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload
//         }
//     },
// })

export const authActions = {
  tryAutoLoginStart,
  tryAutoLoginSuccess,
  tryAutoLoginFail,
  userLoginStart,
  userLoginSuccess,
  userLoginFail,
};
export const authReducer = reducer;
