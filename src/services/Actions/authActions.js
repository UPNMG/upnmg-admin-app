import axiosInstance from "../Axios/axios";
import { authConstants } from "../Constants/authConstants";

export const Login = (user) => {
  console.log(user);
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.post(`/auth/login`, {
        username: user?.email,
        password: user?.password,
      });
      console.log("response", response);
      if (response) {
        // console.log(response.data)
        const { access_token, user_type } = response.data;
        if (user_type === "SYSTEM_USER") {
            localStorage.setItem("token", access_token);
    
            //get user data
            const user = await axiosInstance.get(`/users/profile/me`);
            const { password, ...rest } = user.data;
          localStorage.setItem("user", JSON.stringify(rest));
            console.log('user', user)
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token: access_token, user: rest, user_type: user_type, role: rest.role },
          });
          dispatch({
            type: authConstants.LOADING,
            isLoading: false,
          });
        } else {
          dispatch({
            type: authConstants.RESPONSE_STATE,
            response: {
              state: "ERROR",
              message: "Opps make sure you have the right access",
            },
          });
        }
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE_STATE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: authConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const SignOut = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
      localStorage.clear();
      dispatch({
        type: authConstants.LOG_OUT,
      });
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE_STATE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: authConstants.LOADING,
        isLoading: false,
      });
    }
  };
};


export const AddNewSystemUser = (user) => {
  console.log(user);
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.post(`/users/admin/create`, {
        email: user?.email,
        password: user?.password,
        user_type: 'SYSTEM_USER',
        name: user?.name,
        staff_code: user?.staff_code,
        phone_number: user?.phone_number,
        role: user?.role,
        super_role: user?.super_role,
        staff_id: user.staff_id
      });
     
      if (response) {
        dispatch({
          type: authConstants.RESPONSE_STATE,
          response: {
            state: "SUCCESS",
            message: "New system user added",
          },
        });
        dispatch({
          type: authConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE_STATE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: authConstants.LOADING,
        isLoading: false,
      });
    }
  };
};


export const ResetAuthResponse = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.RESPONSE_STATE,
      response: {
        state: null,
        messgae: "",
      },
    });
  };
};
