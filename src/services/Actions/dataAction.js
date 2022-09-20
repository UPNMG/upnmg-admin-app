import axiosInstance from "../Axios/axios";
import { dataConstants } from "../Constants/dataConstant";

export const GetAppliedLoans = () => {
    
    return async (dispatch) => {
      try {
        dispatch({
          type: dataConstants.LOADING,
          isLoading: true,
        });
        const response = await axiosInstance.get(`/loans/applied-loans`);
       
        if (response) {
            dispatch({
                type: dataConstants.GET_APPLIED_LOANS,
                payload: { appliedLoans: response.data}
            })
            dispatch({
                type: dataConstants.LOADING,
                isLoading: false,
              });
        }
      } catch (e) {
        dispatch({
          type: dataConstants.RESPONSE_STATE,
          response: {
            state: "ERROR",
            message: e?.response?.data?.message ?? "Opps something bad happend",
          },
        });
        dispatch({
          type: dataConstants.LOADING,
          isLoading: false,
        });
      }
    };
  };
  