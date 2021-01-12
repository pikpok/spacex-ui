import { Launch } from "../types"
import { LaunchStatus } from "../utils/launchStatus";

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
  query: {
    upcoming?: boolean;
    success?: boolean;
    $text?: {
      $search: string;
    };
  } | Record<any, never>;
  options: {
    page: number;
    limit: number;
    populate: string[];
  };
}

export const queryLaunches = async (
  query = '',
  status: LaunchStatus | null,
  page = 1,
): Promise<APIResponse<Launch>> => {
  const data: APIRequest = {
    query: {},
    options: {
      page,
      limit: 20,
      populate: ['rocket'],
    },
  };

  if (query) {
    data.query.$text = { $search: query };
  }

  if (status) {
    if (status === 'Future') {
      data.query.upcoming = true;
    } else {
      data.query.success = status === 'Success';
    }
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
