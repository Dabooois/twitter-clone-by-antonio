import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import useUser from './useUser';
import toast from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: number) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isFollowing) {
        await axios.delete('/api/follow', { data: userId });
      } else {
        await axios.post('/api/follow', { userId });
      }

      mutateCurrentUser();
      mutateFetchedUser();
      toast.success('Successss');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    loginModal,
    mutateCurrentUser,
    mutateFetchedUser,
  ]);
  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
