import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

export default function SearchResult({ make, model, year, image }) {
  return (
    <Link href = { `/cars/${ make.toLowerCase() }/${ model.toLowerCase() }` }>
      <a className = 'block cursor-pointer'>
        <div className = 'flex items-center w-full'>
          <Image
            src = { image }
            width = { 60 }
            height = { 60 }
						alt = { `Image of a ${year} ${make} ${model}` }
          />
          <div className = 'ml-4 text-2xl'>
						{ make }
          </div>
          { model }
          { year }
        </div>
      </a>
    </Link>
  )
}

export function LoadingSearchResult() {
  return (
		<div className = 'flex items-center pr-2'>
			<Skeleton
				className = 'mx-2'
				width = { 60 }
				height = { 60 }
			/>
			<div className = 'flex-grow'>
				<Skeleton count = {2}/>
			</div>
		</div>
  )
}