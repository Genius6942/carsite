import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

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

  const SearchBar = () => {
    const searchRef = useRef(null);

    useEffect(() => {
      window.addEventListener('keydown', (e) => {
        if (searchRef && searchRef.current) {
          if (e.key === '/' || (e.key === 'k' && e.ctrlKey)) {
            if (!'textarea, input'.split(' ').includes(e.target.tagName) && !e.target.getAttribute('contentEditable')) {
              e.preventDefault();
              searchRef.current.focus();
            }
          }
        }
      });
    }, []);
    
    return (
      <div className = 'ml-2'>
        <form action = '/search' method = 'GET'>
          <input
            name = 'q'
            ref = { searchRef }
            placeholder = " Press '/' to search"
            className = 'pl-2 text-black border-black rounded-full focus-visible:outline-none focus-visible:border-2'
          />
        </form>
      </div>
    )
  }
  
  return (
    <div className = 'h-10 z-10'>
      <div className = "fixed top-0 left-0 flex items-center px-4 w-screen h-10 bg-theme text-white">
        <Link href = '/'>
          <a className = 'flex items-center font-bold text-lg'>
            <Image
              src = '/favicon.ico'
              width = { 30 }
              height = { 30 }
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