import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, videoId, authorId } = req.body;
  console.log(req.body);
  try {
    const newComment = await prisma.comment.create({
      data: {
        message: message,
        video: {
          connect: { id: videoId },
        },
        author: { connect: { id: authorId } },
      },
    });
    res.status(200).json(newComment);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
