import { prisma } from "./../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { replyId, authorId } = req.body;
  console.log(req.body);
  try {
    const dislike = await prisma.replyLikes.deleteMany({
      where: { replyId: replyId, authorId: authorId },
    });
    res.status(200).json(dislike);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
