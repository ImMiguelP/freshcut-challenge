import { prisma } from "./../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { replyId, authorId } = req.body;
  console.log(req.body);
  try {
    const like = await prisma.replies.update({
      where: { id: replyId },
      data: {
        ReplyLikes: { create: { author: { connect: { id: authorId } } } },
      },
    });
    res.status(200).json(like);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
