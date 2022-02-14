import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '/components/Header';

export default function Page() {
  const router = useRouter();

  const [text, setText] = useState('Loading...');

  useEffect(async () => {
    const body = new URLSearchParams();
  
    body.append('query', new URL(location.href).searchParams.get('q'));
  
    const data = await fetch(
      '/api/search',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      }
    );
    setText(await data.text());
    console.log(text);
  }, []);
  

  return (
    <>
      <Head>
        <title>Search - </title>
      </Head>
      <main>
        { text }
      </main>
    </>
  );
}