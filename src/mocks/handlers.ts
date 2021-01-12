import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { APIRequest } from '../api';

const handlers = [
  rest.post<APIRequest>('https://api.spacexdata.com/v4/launches/query', async (req, res, ctx) => {
    const { page } = req.body.options;
    const firstId = ((page - 1) * 2) + 1;

    return res(ctx.json({
      docs: [
        {
          id: firstId,
          name: `Launch ${firstId}`,
        },
        {
          id: firstId + 1,
          name: `Launch  ${firstId + 1}`,
        },
      ],
      totalPages: 3,
      page,
    }));
  }),
];

const server = setupServer(...handlers);

export { server, rest };
