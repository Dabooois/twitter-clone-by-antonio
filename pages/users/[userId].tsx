import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(Number(userId));

  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={40} />
      </div>
    );
  }

  return (
    <>
      <Header label={fetchedUser?.name || ''} showBackArrow />
      <UserHero userId={fetchedUser?.id} />
      <UserBio userId={fetchedUser?.id} />
      <PostFeed userId={fetchedUser?.id} />
    </>
  );
};

export default UserView;
