// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  users: { name: string; age: number }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = [
    { name: "Aleja", age: 20 },
    { name: "Esteban", age: 25 },
  ];

  res.status(200).json({ users });
}