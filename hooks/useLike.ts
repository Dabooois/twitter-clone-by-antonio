import axios from 'axios';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import usePost from './usePost';
import usePosts from './usePosts';
import { useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId as string);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likeIds || [];
    return list.includes(currentUser?.id);
    
  }, [currentUser?.id, fetchedPost?.likeIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (hasLiked) {
        await axios.delete(`/api/like`, {
          data: {
            postId,
          },
        });
      } else {
        await axios.post(`/api/like`, {
          postId: postId,
        });
      }

      mutateFetchedPosts();
      mutateFetchedPost();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
