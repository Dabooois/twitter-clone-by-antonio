import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid Id');
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser?.id,
        postId: Number(postId),
      },
    });

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json(error);
  }
}
