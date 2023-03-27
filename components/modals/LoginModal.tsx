import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await signIn('credentials', {
        email,
        password,
      });
      loginModal.onClose();
    } catch (error) {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        placeholder='Enter Email'
        type='email'
      />

      <Input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        placeholder='Enter password'
        type='password'
      />
    </div>
  );

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        First time using twitter ?{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          Create an account
        </span>
      </p>
    </div>
  );
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        title='Login'
        actionLabel='Sign in'
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;
