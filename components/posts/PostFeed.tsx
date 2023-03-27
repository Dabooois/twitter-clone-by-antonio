import usePosts from '@/hooks/usePosts';
import React from 'react';
import PostItem from './PostItem';

interface IPostFeed {
  userId?: string;
}

const PostFeed: React.FC<IPostFeed> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string);
  return (
    <>
      {posts.map((post: Record<string, any>) => {
        return <PostItem key={post.id} data={post} userId={userId} />;
      })}
    </>
  );
};

export default PostFeed;
