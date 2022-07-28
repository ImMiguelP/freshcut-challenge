import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body;
  try {
    const commentData = await prisma.comment.findUnique({
      where: { id: Number(id) },
      include: {
        CommentLikes: true,
        author: true,
      },
    });
    res.status(200).json(commentData);
  } catch (error) {
    console.warn(error);
    res.status(400).json({ error });
  }
};

export default handler;
