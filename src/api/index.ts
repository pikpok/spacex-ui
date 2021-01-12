import { Launch } from "../types"

export interface APIResponse<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface APIRequest {
  query: {};
  options: {
    page: number;
    limit: number;
  };
}

export const queryLaunches = async (query = '', page = 1): Promise<APIResponse<Launch>> => {
  const data = {
    query: {},
    options: {
      page,
      limit: 10,
    },
  };

  const response = await fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  let errorMessage: string;

  try {
    errorMessage = await response.text();
  } catch {
    errorMessage = '';
  }

  throw new Error(errorMessage);
}
