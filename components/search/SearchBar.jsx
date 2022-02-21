import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import ajax from '/lib/ajax';

export default function SearchBar() {
  // Hooks for search bar
  const searchRef = useRef(null);

  // router
  const router = useRouter();

  // For click to close input. Not in use right now
  /**
   * @param {HTMLElement} child 
   * @param {HTMLElement} parent 
   */
  /*
  const isDeepChildOf = (child, parent) => {
    console.log(child.parentNode, parent);
    if (child == parent) {
      return true;
    } else if (child === document.body || child === document.documentElement || document.head || window) {
      return false;
    } else {
      return isDeepChildOf(child.parentNode, parent);
    }
  }
  */

  // create event listeners for search shortcuts (/ and ctrl+k) and close search (Esc)
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      // focus search on / or ctrl k
      if (e.key === '/' || (e.key === 'k' && e.ctrlKey)) {
        if (searchRef.current && e.target !== searchRef.current) {
          e.preventDefault();
          searchRef.current.focus();
        }
      } else if (e.key === 'Escape') {
        // close search on Esc
        e.preventDefault();
        searchRef.current.value = '';
        searchRef.current.blur();
        setSearchItems('hidden');
        setSelected(null);
        setInputValue('');
      }
    });
  }, []);

  // list of books to be shown under search
  const [searchItems, setSearchItems] = useState('hidden');
  // selected book in list
  const [selected, setSelected] = useState(null);
  // current value of input
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="relative my-auto h-6 w-48 text-black">
      <div
        className="absolute ml-3 bg-white overflow-y-auto rounded-xl z-20 shadow-2xl"
        onKeyDown={
					// Allow users to arrow up and down to select search results
					// and hit enter to navigate to a result
          (e) => {
            if (searchItems instanceof Array && searchItems.length > 0) {

              if (e.key === 'ArrowUp') {
                // move selected item up

                e.preventDefault();
                const idx = (typeof selected !== 'number') ? searchItems.length - 1 : (selected > 0) ? selected - 1 : searchItems.length - 1;
                setSelected(idx);
                searchRef.current.value = `${searchItems[idx].make} ${searchItems[idx].model} ${searchItems[idx].year.toString()}`;
              } else if (e.key === 'ArrowDown') {
                // move selected item down

                e.preventDefault();
                const idx = (typeof selected !== 'number') ? 0 : (selected < searchItems.length - 1) ? selected + 1 : 0;
                setSelected(idx);
                searchRef.current.value = `${searchItems[idx].make} ${searchItems[idx].model} ${searchItems[idx].year.toString()}`;
              } else if (e.key === 'Enter' && searchItems[selected]) {
                const idx = (typeof selected !== 'number') ? 0 : (selected < searchItems.length - 1) ? selected + 1 : 0;
                // navigate to the selected item
                router.push(`/cars/${searchItems[idx].make.toLowerCase()}/${searchItems[idx].model.toLowerCase()}/${searchItems[idx].year.toString()}`);
              }
            }
          }
        }
      >
        <input
          onChange={
            async (e) => {
              // grab the current value
              const inputText = e.target.value.toLowerCase();
              // save the input value
              setInputValue(inputText);
              if (inputText.length > 0) { // there is content
                // match items
                let data = await ajax('/api/search', { query: inputText, limit: 10 });
                data = await data.json();
								// uncomment to put a limit on number of results
                // searchedBooks.length = Math.min(searchedBooks.length, Infinity);
                setSearchItems(data);
              } else {
                // hide search box
                setSearchItems('hidden');
              }
              setSelected(null);
            }
          }
          onKeyDown={
						// if the current search value is a book name
						// navigate to that book
            (e) => {
              if (e.key === 'Enter') {
                location.href = `/search?q=${e.target.value}`;
              }
            }
          }
          ref={searchRef}
          placeholder="Press '/' to search"
          className="w-48 h-6 p-3 border-2 rounded-xl focus-visible:outline-none focus-visible:border-black"
        />
        {/* container for search items */}
				{ (searchItems !== 'hidden') ? (
					<div
						className="w-full max-h-[75vh] bg-white rounded-xl overflow-y-auto nobar"
					>
						{(() => {
							if (searchItems.length > 0) {
								return (
									<div className="relative">
										{searchItems.map((item, idx) => (
											<div key={idx}>
												<Link href={`/cars/${item.make.toLowerCase()}/${item.model.toLowerCase()}/${item.year.toString()}`} className="w-full">
													<a
														className="block w-full rounded-xl"
														style={{ backgroundColor: (idx === selected) ? 'rgba(0, 0, 0, .2)' : 'transparent' }}
													>
														<div className="flex justify-center w-full">
                              <p className = 'text-center'>
                                { item.make + ' ' + item.model + ' ' + item.year.toString() }
                              </p>
														</div>
													</a>
												</Link>
											</div>
										))}
									</div>
								);
							} else {
								return 'No Results Found';
							}
						})()}
					</div>
				) : null }
      </div>
    </div>
  )
}