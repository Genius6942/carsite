import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import SearchBar from '/components/search/SearchBar'

export default function Header() {
  const HeaderLinkBtn = ({ text, to }) => (
    <div className = 'ml-2 px-2 py-1 rounded-md hover:bg-[rgba(0,0,0,.2)]'>
      <Link href = { to }>
        <a>
          { text }
        </a>
      </Link>
    </div>
  );
  
  return (
    <div className = 'h-10'>
      <div className = "fixed top-0 left-0 flex items-center px-4 w-screen h-10 bg-theme text-white z-10">
        <Link href = '/'>
          <a className = 'flex items-center font-bold text-lg'>
            <Image
              src = '/favicon.ico'
              width = { 30 }
              height = { 30 }
							alt = 'carsite'
            />
            Cars Site
          </a>
        </Link>
        <HeaderLinkBtn text = 'hello' to = '/hello'/>
        <HeaderLinkBtn text = 'pricing' to = '/pricing'/>
        <HeaderLinkBtn text = 'about' to = '/about'/>
        <HeaderLinkBtn text = 'brands' to = '/brands'/>
        <SearchBar/>
      </div>
    </div>
  )
}