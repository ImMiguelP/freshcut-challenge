import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorId, videoId } = req.body;
  console.log(req.body);
  try {
    const like = await prisma.video.update({
      where: { id: videoId },
      data: {
        VideoLikes: { create: { author: { connect: { id: authorId } } } },
      },
    });
    res.status(200).json(like);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
