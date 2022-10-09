import { dataConstants } from "../Constants/dataConstant";

const initialState = {
  isLoading: false,
  appliedLoans: [],
  funds: [],
  members: [],
  loans: [],
  dues: [],
  system_users: [],

  paginate: {
    total: 0,
    totalItems: 0,
    page: 1,
    size: 15,
    previousPage: null,
    nextPage: null,
    previousNumber: null,
    nextNumber: null,
    currentPageSize: 0,
  },
  response: {
    state: null,
    message: '',
    action: ''
}
};
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case dataConstants.LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case dataConstants.GET_APPLIED_LOANS:
      return {
        ...state,
        appliedLoans: action.payload.appliedLoans,
      };
    case dataConstants.GET_FUNDS:
      return {
        ...state,
        funds: action.payload.funds,
        paginate: action.payload.paginate,
      };
    case dataConstants.GET_MEMBERS:
      return {
        ...state,
        members: action.payload.members,
        paginate: action.payload.paginate,
      };
    case dataConstants.GET_DUES:
      return {
        ...state,
        dues: action.payload.dues,
        paginate: action.payload.paginate,
      };
    case dataConstants.GET_SYSTEM_USERS:
      return {
        ...state,
        system_users: action.payload.system_users,
      };
    case dataConstants.GET_LOANS:
      return {
        ...state,
        loans: action.payload.loans,
        paginate: action.payload.paginate,
      };
    case dataConstants.RESPONSE_STATE:
      return {
        ...state,
        response: {
          state: action.response.state,
          message: action.response.message,
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
