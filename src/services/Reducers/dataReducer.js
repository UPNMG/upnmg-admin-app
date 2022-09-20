import { dataConstants } from "../Constants/dataConstant"

const initialState = {
    isLoading: false,
    appliedLoans: [],

}
const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case dataConstants.LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case dataConstants.GET_APPLIED_LOANS:
            return {
                ...state,
                appliedLoans: action.payload.appliedLoans
            }
        default:
            return state
    }
}

export default dataReducer