import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import sleep from '/lib/dev.ts';
import SearchResult, { LoadingSearchResult } from '/components/search/SearchResult';
import ajax from '/lib/ajax';

export default function Page() {
  const router = useRouter();

  // json data of cars
  const [data, setData] = useState(null);
  // which page ur on [1-10, 10-20]
  const [page, setPage] = useState(0);
  // whether or not page is loading
  const [loading, setLoading] = useState(true);
  // Items in a page
  const pageLength = 30;

  useEffect(() => {
		(async () => {
			await sleep(true); // wait forever
			const data = await ajax('/api/search', { query: new URL(location.href).searchParams.get('q') })
			setData(await data.json());
			setLoading(false);
		})();
  }, []);

  return (
    <>
      <Head>
        <title>Search - carsite</title>
      </Head>
      <main>
        { data === null ? new Array(pageLength).fill().map((_, idx) => <LoadingSearchResult key={ idx }/>)
          : data.length > 1 ? data.slice(page * pageLength, (page + 1) * pageLength).map((car, idx) => (
          <SearchResult
            make={ car.make }
            model={ car.model }
            year={ car.year }
            image={ car.image }
						key={ idx }
          />
        )) : 'No results. :(' }
      </main>
    </>
  );
}