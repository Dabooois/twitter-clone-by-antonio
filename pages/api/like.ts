import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req);
    if (!postId || typeof postId !== 'number') {
      throw new Error('Invalid Id');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('Invalid Id');
    }
    let updatedLikes = [...(post.likeIds || [])];

    if (req.method === 'POST') {
      updatedLikes.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: 'Someone liked your tweet!',
              userId: Number(post?.userId),
            },
          });

          await prisma.user.update({
            where: {
              id: post?.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error) {
        console.log(error);

        return res.status(400).end();
      }
    }

    if (req.method === 'DELETE') {
      updatedLikes = updatedLikes.filter((likeId) => likeId !== currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeIds: updatedLikes,
      },
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
