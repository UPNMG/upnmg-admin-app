import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dataReducer from "./dataReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    product: productReducer,
})

export default rootReducer