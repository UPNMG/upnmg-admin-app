import axiosInstance from "../Axios/axios";
import { messageConstants } from "../Constants/messageConstant";

export const GetConversations = (user_id) => {
    return async (dispatch) => {
      try {
        console.log("user_id", user_id);
        dispatch({
          type: messageConstants.LOADING,
          isLoading: true,
        });
        const response = await axiosInstance.get(
          `/messenger/conversation/${user_id}`
        );
  
        if (response) {
          // localStorage.setItem("conversations", JSON.stringify(response.data));
          dispatch({
            type: messageConstants.GET_CONVERSATIONS,
            payload: { conversations: response.data },
          });
          dispatch({
            type: messageConstants.LOADING,
            isLoading: false,
          });
        }
      } catch (e) {
        dispatch({
          type: messageConstants.LOADING,
          isLoading: false,
        });
      }
    };
  };
  
  export const GetMessages = (conversation_id) => {
    return async (dispatch) => {
      try {
        dispatch({
          type: messageConstants.LOADING,
          isLoading: true,
        });
  
        const response = await axiosInstance.get(
          `/messenger/messages/${conversation_id}`
        );
        if (response) {
          dispatch({
            type: messageConstants.GET_MESSAGES,
            payload: { messages: response.data },
          });
          dispatch({
            type: messageConstants.LOADING,
            isLoading: false,
          });
        }
      } catch (e) {
        dispatch({
          type: messageConstants.LOADING,
          isLoading: false,
        });
      }
    };
  };

//   export const GetUsersForChat = () => {
//     return async (dispatch) => {
//       try {
//         dispatch({
//           type: messageConstants.LOADING,
//           isLoading: true,
//         });
  
//         const response = await axiosInstance.get(
//           `/messenger/users`
//         );
//         if (response) {
//           dispatch({
//             type: messageConstants.GET_USERS_FOR_CHAT,
//             payload: { usersForChat: response.data },
//           });
//           dispatch({
//             type: messageConstants.LOADING,
//             isLoading: false,
//           });
//         }
//       } catch (e) {
//         dispatch({
//           type: messageConstants.LOADING,
//           isLoading: false,
//         });
//       }
//     };
//   };
  
export const addMessages = (data) => {
    return async (dispatch) => {
      try {
        dispatch({
          type: messageConstants.LOADING,
          isLoading: true,
        });
        const response = await axiosInstance.post("/messenger/messages", data);
        if (response) {
          dispatch({
            type: messageConstants.GET_MESSAGES,
            payload: response.data,
          });
          dispatch({
            type: messageConstants.LOADING,
            isLoading: false,
          });
        }
      } catch (e) {
        dispatch({
          type: messageConstants.LOADING,
          isLoading: false,
        });
      }
    };
  };
