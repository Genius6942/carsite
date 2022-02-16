import Image from 'next/image';

export default function SearchResult({ make, model, year, image }) {
  return (
    <div>
      { make } { model } { year } 
      <Image
        src = { image }
        width = { 30 }
        height = { 30 }
      />
    </div>
  )
}