import React, { useCallback, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import Button from './Button';
import Avatar from './Avatar';
import usePost from '@/hooks/usePost';

interface IForm {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<IForm> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmt = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;
      await axios.post(url, {
        body,
      });
      toast.success('Tweet created');
      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      <div className='py-8'>
        <h1
          className={`text-white text-center text-2xl mb-4 font-bold ${
            isComment ? 'hidden' : ''
          }`}
        >
          Welcome to Twitter
        </h1>
        {currentUser ? (
          <div className='flex flex-row gap-4'>
            <div>
              <Avatar userId={currentUser?.id} />
            </div>
            <div className='w-full'>
              <textarea
                placeholder={placeholder}
                className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'
                value={body}
                disabled={isLoading}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition' />
              <div className='mt-4 flex flex-row justify-end'>
                <Button
                  disabled={isLoading || !body}
                  label='Tweet'
                  onClick={onSubmt}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' onClick={registerModal.onOpen} secondary />
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
