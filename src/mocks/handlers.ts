import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { APIRequest } from '../api';

const handlers = [
  rest.post<APIRequest>('https://api.spacexdata.com/v4/launches/query', async (req, res, ctx) => {
    const { query, options: { page } } = req.body;
    const firstId = ((page - 1) * 2) + 1;
    const launches = [
      { id: firstId, name: `Launch ${firstId}` },
      { id: firstId + 1, name: `Launch  ${firstId + 1}` },
    ];

    if (query) {
      return res(ctx.json({
        docs: [{ ...launches[0], name: query.$text.$search }],
        totalPages: 1,
        page,
      }));
    }

    return res(ctx.json({
      docs: launches,
      totalPages: 3,
      page,
    }));
  }),
];

const server = setupServer(...handlers);

export { server, rest };
