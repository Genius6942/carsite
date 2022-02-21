import Image from 'next/image';
import Link from 'next/link';

export default function SearchResult({ make, model, year, image }) {
  return (
    <Link href = { `/cars/${ make.toLowerCase() }/${ model.toLowerCase() }` }>
      <a className = 'block cursor-pointer'>
        <div className = 'flex items-center w-full'>
          <Image
            src = { image }
            width = { 60 }
            height = { 60 }
          />
          <div className = 'ml-4 text-2xl'>
            <Link href = { `/cars/${ make.toLowerCase() }` }>
              { make }
            </Link>
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
    <div>
      loading
    </div>
  )
}