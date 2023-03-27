import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(400).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    const { username, name, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error('Missing Fields');
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
}
