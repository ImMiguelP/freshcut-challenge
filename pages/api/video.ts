import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body;
  try {
    const video = await prisma.video.findUnique({
      where: { id: Number(id) },
      include: {
        VideoLikes: true,
        author: true,
        comment: {
          include: {
            author: true,
            CommentLikes: true,
            Replies: { include: { author: true, ReplyLikes: true } },
          },
        },
      },
    });
    res.status(200).json(video);
  } catch (error) {
    console.warn(error);
    res.status(400).json({ error });
  }
};

export default handler;
