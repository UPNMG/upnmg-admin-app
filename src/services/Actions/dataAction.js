/* eslint-disable  */
import { ApiEndpoints } from "../Axios/apiEndpoints";
import axiosInstance from "../Axios/axios";
import { dataConstants } from "../Constants/dataConstant";

export const GetAppliedLoans = (
  isPaginated,
  page,
  size,
  status,
  search,
  filter
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      // ?status=${status}
      const response = await axiosInstance.get(
        `/loans/applied-loans?isPaginated=${isPaginated}&page=${page}&size=${size}&status=${status}${
          search ? search : ""
        }${filter ? filter : ""}`
      );
      // const response = await axiosInstance.get(`/loans/applied-loans${status && `?status=`+status }`);

      if (response) {
        // dispatch({
        //   type: dataConstants.GET_APPLIED_LOANS,
        //   payload: { appliedLoans: response.data },
        // });
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: dataConstants.GET_APPLIED_LOANS,
          payload: {
            appliedLoans: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
          // payload: { funds: response.data}
        });
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
export const GetSystemUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(
        ApiEndpoints.GET_ALL_SYSTEM_USERS
      );

      if (response) {
        dispatch({
          type: dataConstants.GET_SYSTEM_USERS,
          payload: { system_users: response.data },
        });
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
export const GetMembers = (isPaginated, page, size, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(
        `/users/members?isPaginated=${isPaginated}&page=${page}&size=${size}${
          search ? search : ""
        }`
      );
      // const response = await axiosInstance.get(
      //   `/users/members`
      // );

      // console.log('response.members', response)

      if (response) {
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: dataConstants.GET_MEMBERS,
          payload: {
            members: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
          // payload: { funds: response.data}
        });
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
export const MarkedAsBookedAppliedLoans = (loan_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.put(
        `/loans/my-applied-loans/booked-status/${loan_id}`,
        body
      );

      if (response) {
        dispatch({
          type: dataConstants.RESPONSE_STATE,
          response: {
            state: "SUCCESS",
            message: "Status marked as booked",
          },
        });
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
export const MarkedAsInitiatedAppliedLoans = (loan_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.put(
        `/loans/my-applied-loans/initiated-status/${loan_id}`,
        body
      );

      if (response) {
        dispatch({
          type: dataConstants.RESPONSE_STATE,
          response: {
            state: "SUCCESS",
            message: "Status marked as Initiated",
          },
        });
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
export const MarkedAsPaidAppliedLoans = (loan_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.put(
        `/loans/my-applied-loans/paid-status/${loan_id}`,
        body
      );

      if (response) {
        dispatch({
          type: dataConstants.RESPONSE_STATE,
          response: {
            state: "SUCCESS",
            message: "Status marked as Paid",
          },
        });
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

export const GetAllFunds = (isPaginated, page, size, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.get(
        `/funds?isPaginated=${isPaginated}&page=${page}&size=${size}${
          search ? search : ""
        }`
      );
      console.log("response", response);
      if (response) {
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: dataConstants.GET_FUNDS,
          payload: {
            funds: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
          // payload: { funds: response.data}
        });
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
export const GetTotal = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });

      console.log('from total')
      
      // const res = Promise.all([
      //   await axiosInstance.get(`/users/members/total`),
      //   await axiosInstance.get(`/funds/total`),
      //   await axiosInstance.get(`/dues/total`),
      //   await axiosInstance.get(`/loans/total`)
      // ])

      // console.log('membersResponse', res)

      const membersResponse = await axiosInstance.get(`/users/members/total`);
      const fundsResponse = await axiosInstance.get(`/funds/total`);
      const duesResponse = await axiosInstance.get(`/dues/total`);
      const loansResponse = await axiosInstance.get(`/loans/total`);

      console.log('fundsResponse', fundsResponse)

      if (fundsResponse ) {
        dispatch({
          type: dataConstants.GET_TOTAL,
          payload: {
            totalMembers: membersResponse.data,
            totalFunds: fundsResponse.data,
            totalDues: duesResponse.data,
            totalLoans: loansResponse.data,
          },
        });
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
export const GetAllDues = (isPaginated, page, size, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.get(
        `/dues?isPaginated=${isPaginated}&page=${page}&size=${size}${
          search ? search : ""
        }`
      );

      if (response) {
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: dataConstants.GET_DUES,
          payload: {
            dues: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
        });
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
export const GetAllLoans = (isPaginated, page, size, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: dataConstants.LOADING,
        isLoading: true,
      });
      const response = await axiosInstance.get(
        `/loans?isPaginated=${isPaginated}&page=${page}&size=${size}${
          search ? search : ""
        }`
      );
      console.log("response", response);
      if (response) {
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: dataConstants.GET_LOANS,
          payload: {
            loans: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
        });
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

export const ResetDataResponse = () => {
  return async (dispatch) => {
    dispatch({
      type: dataConstants.RESPONSE_STATE,
      response: {
        state: null,
        message: "",
      },
    });
  };
};
