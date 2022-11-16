/* eslint-disable  */
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
            type: authConstants.RESPONSE,
            response: {
              state: "ERROR",
              message: "Opps make sure you have the right access",
            },
          });
          dispatch({
            type: authConstants.LOADING,
            isLoading: false,
          });
        }
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
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

export const GetUserProfile = () => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const access_token = window.localStorage.getItem("token");
      console.log("user", user);
      console.log("access_token", access_token);

      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.get(`/users/profile/me`);

      if (response) {
        const { access_token, user_type } = response.data;
        const { password, ...rest } = response.data;
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token: access_token, user: rest, user_type: user_type, role: rest.role },
     
        });
        dispatch({
          type: authConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
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
        logout: true
      });
      dispatch({
        type: authConstants.LOADING,
        isLoading: false,
      });
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
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
          type: authConstants.RESPONSE,
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
        type: authConstants.RESPONSE,
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
export const DeleteSystemUser = (staff_code) => {

  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.delete(`/users/admin/delete/${staff_code}`);
     
      if (response) {
        dispatch({
          type: authConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "User deleted successfully",
          },
        });
        dispatch({
          type: authConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
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
export const EditSystemUser = (id, user) => {

  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.put(`/users/admin/edit/${id}`, user);
     
      if (response) {
        dispatch({
          type: authConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "User updated successfully",
          },
        });
        dispatch({
          type: authConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
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

export const UpdateProfileImage = (image, public_id) => {
  return async (dispatch) => {
    try {
 
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });
    
      const data = {
        profile_image: image,
      };
      const response = await axiosInstance.put(`/users/profile/me/profile_image?public_id=${public_id}`, data);
      if (response) {
        dispatch({
          type: authConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Profile updated successfully",
          },
        });
        dispatch({
          type: authConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
        response: {
          state: "ERROR",
          message:
            e?.response?.data?.message ?? "Profile image update failed",
        },
      });
      dispatch({
        type: authConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const ChangePassword = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.LOADING,
        isLoading: true,
      });

      console.log("user", user);
      const response = await axiosInstance.put(`/auth/change-password`, user);

      if (response) {
        dispatch({
          type: authConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Password changed successfully",
          },
        });
        dispatch({
          type: authConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data.message ?? "Opps something bad happend",
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
      type: authConstants.RESPONSE,
      response: {
        state: null,
        messgae: "",
      },
    });
  };
};
