import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { follow, followed } = req.body;
  console.log(req.body);
  try {
    const followUser = await prisma.user.update({
      where: { id: follow },
      data: {
        followedBy: { connect: { id: followed } },
      },
    });
    res.status(200).json(followUser);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
