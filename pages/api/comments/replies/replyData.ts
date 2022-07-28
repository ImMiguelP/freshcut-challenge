import { prisma } from "./../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body;
  try {
    const replyData = await prisma.replies.findUnique({
      where: { id: Number(id) },
      include: {
        ReplyLikes: true,
        author: true,
      },
    });
    res.status(200).json(replyData);
  } catch (error) {
    console.warn(error);
    res.status(400).json({ error });
  }
};

export default handler;
