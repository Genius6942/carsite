import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Page() {
	const router = useRouter();
	console.log(router)
	return (
		<main>
			<Head>
				<title>Make</title>
			</Head>
			Brand
		</main>
	);
}

export function getServerSideProps({ query }) {
	return {
		redirect: {
			destination: '/brands/' + query.make
		}
	}
}