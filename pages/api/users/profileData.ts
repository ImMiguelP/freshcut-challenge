import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body;
  try {
    const profileData = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        following: true,
        followedBy: true,
        VideoLikes: true,
      },
    });
    res.status(200).json(profileData);
  } catch (error) {
    console.warn(error);
    res.status(400).json({ error });
  }
};

export default handler;
