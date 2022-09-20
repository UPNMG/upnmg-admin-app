import { authConstants } from "../Constants/authConstants";
const initialState = {
    isLoading: false,
    access_token: null,
    user: null,
    user_type: null,
    authenticated: false,
    role: [],
    response: {
        state: null,
        message: ""
    }
}
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case authConstants.LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.token,
                user_type: action.payload.user_type,
                user: action.payload.user,
                role: action.payload.role,
                authenticated: true,
            }
        case authConstants.RESPONSE_STATE:
            return {
                ...state,
                response: {
                    state: action.response.state,
                    message: action.response.message
                }
            }
        default:
            return state
    }
}

export default authReducer