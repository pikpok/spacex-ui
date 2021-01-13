import { Filters } from "../components/FiltersRow";
import { Launch } from "../types";

export interface State {
  error: string;
  loading: boolean;
  launches: Launch[],
  filters: Filters,
  pagination: {
    currentPage: number;
    totalPages: number;
  },
}

export enum ActionType {
  SET_LAUNCHES = 'SET_LAUNCHES',
  SET_FILTER = 'SET_FILTER',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_PAGINATION = 'SET_PAGINATION',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
}

export type Action = {
  type: ActionType.SET_LAUNCHES;
  value: Launch[];
} | {
  type: ActionType.SET_FILTER;
  key: keyof Filters;
  value: Filters[keyof Filters];
} | {
  type: ActionType.SET_ERROR;
  value: string;
} | {
  type: ActionType.SET_LOADING;
  value: boolean;
} | {
  type: ActionType.SET_PAGINATION;
  value: State['pagination'];
} | {
  type: ActionType.SET_CURRENT_PAGE;
  value: number;
};

export const initialState: State = {
  error: '',
  loading: false,
  launches: [],
  filters: {
    query: '',
    status: null,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.SET_LAUNCHES:
      return {
        ...state,
        launches: action.value,
      };
    case ActionType.SET_FILTER:
      return {
        ...state,
        pagination: { ...initialState.pagination },
        filters: { ...state.filters, [action.key]: action.value }
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    case ActionType.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...action.value }
      };
    case ActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.value,
        },
      };
  }
};
