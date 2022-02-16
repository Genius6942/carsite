import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchResult from '/components/search/SearchResult';

export default function Page() {
  const router = useRouter();

  // json data of cars
  const [data, setData] = useState([]);
  // which page ur on [1-10, 10-20]
  const [page, setPage] = useState(0);
  // Items in a page
  const pageLength = 30;

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
    setData(await data.json());
    await new Promise(r=>setTimeout(r, 1000));
  }, []);

  return (
    <>
      <Head>
        <title>Search - carsite</title>
      </Head>
      <main>
        { data.length === 0 ? 'Loading...' : null }
        { data.slice(page * pageLength, (page + 1) * pageLength).map(car => (
          <SearchResult
            make={ car.make }
            model={ car.model }
            year={ car.year }
            image={ car.image }
          />
        )) }
      </main>
    </>
  );
}