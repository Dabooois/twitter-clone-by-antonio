import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';
interface IHeader {
  label: string;
  showBackArrow?: boolean;
}
function Header({ showBackArrow, label }: IHeader) {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  

  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
      <div className='flex flex-row items-center gap-2'>
        {showBackArrow && (
          <BiArrowBack
            color='white'
            size={20}
            onClick={handleBack}
            className='cursor-pointer hover:opacity-70 transition'
          />
        )}
        <h1 className='text-white text-xl font-semibold'>{label}</h1>
      </div>
    </div>
  );
}

export default Header;
