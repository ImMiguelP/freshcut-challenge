import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const profileData = await prisma.videoLikes.findMany();
    res.status(200).json(profileData);
  } catch (error) {
    console.warn(error);
    res.status(400).json({ error });
  }
};

export default handler;
