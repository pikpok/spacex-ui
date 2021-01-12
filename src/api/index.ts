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
  query?: {
    $text: {
      $search: string;
    };
  };
  options: {
    page: number;
    limit: number;
    populate: string[];
  };
}

export const queryLaunches = async (query = '', page = 1): Promise<APIResponse<Launch>> => {
  const data: APIRequest = {
    options: {
      page,
      limit: 20,
      populate: ['rocket'],
    },
  };

  if (query) {
    data.query = {
      $text: { $search: query },
    };
  }

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
