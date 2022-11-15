import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";
import messageReducer from "./messageReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    product: productReducer,
    message: messageReducer
})

export default rootReducer