import React, { useCallback, useState } from 'react';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      toast.success('Account Created');
      signIn('credentials', { email, password });
      registerModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');

      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

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
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        placeholder='Enter Name'
        type='text'
      />
      <Input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        placeholder='Enter Username'
        type='text'
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
        Already hadve an account ?{' '}
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        title='Create An Account'
        actionLabel='Register'
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
