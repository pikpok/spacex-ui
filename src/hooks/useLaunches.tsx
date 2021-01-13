import { useEffect, useReducer } from 'react';
import { queryLaunches } from '../api';
import { Filters } from '../components/FiltersRow';
import { ActionType, initialState, reducer } from './launchesReducer';

export const useLaunches = () => {
  const [
    { launches, pagination, error, filters, loading },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ActionType.SET_ERROR, value: '' });
    dispatch({ type: ActionType.SET_LOADING, value: true });

    queryLaunches(filters.query, filters.status, pagination.currentPage)
      .then((data) => {
        dispatch({ type: ActionType.SET_LAUNCHES, value: data.docs });
        dispatch({
          type: ActionType.SET_PAGINATION,
          value: {
            currentPage: data.page,
            totalPages: data.totalPages,
          }
        });
      })
      .catch((error) => {
        if (error && error.message) {
          dispatch({ type: ActionType.SET_ERROR, value: error.message });
        } else {
          dispatch({ type: ActionType.SET_ERROR, value: 'Please try again' });
        }
      })
      .finally(() => {
        dispatch({ type: ActionType.SET_LOADING, value: false });
      });
  }, [filters, pagination.currentPage]);

  return {
    pagination,
    error,
    filters,
    loading,
    launches,
    setCurrentPage: (value: number) => dispatch({ type: ActionType.SET_CURRENT_PAGE, value }),
    closeError: () => dispatch({ type: ActionType.SET_ERROR, value: '' }),
    setFilter: (key: keyof Filters, value: Filters[keyof Filters]) => dispatch({
      type: ActionType.SET_FILTER,
      key,
      value,
    }),
  };
};
