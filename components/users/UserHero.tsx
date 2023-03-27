import useUser from '@/hooks/useUser';
import Image from 'next/image';
import React from 'react';
import Avatar from '../Avatar';

interface IUserHero {
  userId: number;
}

const UserHero: React.FC<IUserHero> = ({ userId }) => {
  const { data: fetchUser } = useUser(userId);

  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {fetchUser?.coverImage && (
          <Image
            src={fetchUser.coverImage}
            fill
            alt='Cover Image'
            style={{ objectFit: 'cover' }}
          />
        )}

        <div className='absolute -bottom-16 left-4'>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
