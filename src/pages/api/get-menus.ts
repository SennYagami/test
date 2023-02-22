// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Menus {
  label: string;
  key: string;
}

type ResData<T> = {
  message: string;
  code: number;
  data: T;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResData<Menus[]>>) {
  res.status(200).json({
    message: 'success',
    code: 0,
    data: [
      {
        label: 'x',
        key: 'x',
      },
    ],
  });
}
