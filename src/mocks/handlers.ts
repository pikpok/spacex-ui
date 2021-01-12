import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { APIRequest } from '../api';

const handlers = [
  rest.post<APIRequest>('https://api.spacexdata.com/v4/launches/query', async (req, res, ctx) => {
    const { query, options: { page } } = req.body;
    const launches = [...Array(2)].map((_, index) => {
      const id = ((page - 1) * 2) + 1 + index;

      return {
        id,
        name: `Launch ${id}`,
        rocket: { name: `Rocket ${id}` },
        links: {
          flickr: {
            original: ['https://example.com/image.png'],
          },
        },
      };
    });

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
