import Form from '@/components/Form';
import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Header label='Home' />
      <Form placeholder="What's Happening" />
      <PostFeed />
    </>
  );
}
