import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { follow, followed } = req.body;
  console.log(req.body);
  try {
    const unfollowUser = await prisma.user.update({
      where: { id: follow },
      data: { followedBy: { disconnect: { id: followed } } },
    });
    res.status(200).json(unfollowUser);
  } catch (error) {
    console.warn(" test", error);
    res.status(400).json({ error });
  }
};

export default handler;
