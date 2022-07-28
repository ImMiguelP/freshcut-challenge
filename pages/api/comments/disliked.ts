import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId, authorId } = req.body;
  console.log(req.body);
  try {
    const dislike = await prisma.commentLikes.deleteMany({
      where: { commentId: commentId, authorId: authorId },
    });
    res.status(200).json(dislike);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
