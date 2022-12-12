import { productConstants } from "../Constants/productConstant";

const initialValues = {
  isLoading: false,
  category: [],
  products: [],
  orders: [],
  suppliers: [],
  product_detailed: {},
  totals: {
    totalProducts: 0,
    totalOrders: 0,
    totalApprovedOrders: 0,
    totalInitiatedOrders: 0,
    totalRejectedOrders: 0,
    totalShippedOrders: 0,
    totalSubmitedOrders: 0
  },
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
    message: "",
    action: "",
  },

};

const productReducer = (state = initialValues, action) => {
  switch (action.type) {
    case productConstants.LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case productConstants.GET_PRODUCT_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case productConstants.GET_TOTALS:
      return {
        ...state,
        totals: action.payload.totals,
      };
    case productConstants.GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload.suppliers,
      };
    case productConstants.GET_PRODUCT:
      return {
        ...state,
        products: action.payload.products,
        paginate: action.payload.paginate,
      };
    case productConstants.GET_PRODUCT_DETAILED:
      return {
        ...state,
        product_detailed: action.payload.product_detailed,
       
      };
    case productConstants.GET_ORDERS:
      return {
        ...state,
        orders: action.payload.products,
        paginate: action.payload.paginate,
      };

    case productConstants.RESPONSE:
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

export default productReducer;
