import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await prisma.user.create({
      data: {
        username: "test",
        avatar: "/assests/avatars/avatar.png",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default handler;
