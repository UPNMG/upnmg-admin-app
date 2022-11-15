import { messageConstants } from "../Constants/messageConstant";

const initialState = {
  message: {},
  isLoading: false,
  conversations: [],
  usersForChat: {},
  response: {
    state: null,
    message: "",
  },
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageConstants.LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case messageConstants.RESPONSE_STATE:
      return {
        ...state,
        response: {
          state: action.payload.state,
          message: action.payload.message,
        },
      };
    case messageConstants.GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    case messageConstants.GET_MESSAGES:
      return {
        ...state,
        message: action.payload.messages,
      };
    case messageConstants.GET_USERS_FOR_CHAT:
      return {
        ...state,
        usersForChat: action.payload.usersForChat,
      };
    default:
      return state;
  }
};

export default messageReducer;
