'use client'

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import provinces from './data/provinces'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  //ค้นหาแค่ตอนที่ search เปลี่ยน (ใช้ useMemo)
  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return [];
    return provinces.filter((province) =>
      province.includes(search.trim())
    );
  }, [search]);

  const handleSearch = (searchValue) => {
    if (!searchValue.trim() && filteredSuggestions.length > 0) {
      searchValue = filteredSuggestions[0]; //เลือกตัวแรกถ้าไม่ได้พิมพ์ครบ
    }
    if (!searchValue.trim()) return;
    setSuggestions([]);
    router.push(`/?province=${encodeURIComponent(searchValue.trim())}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSuggestions(filteredSuggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
  };

  return (
    <nav className='w-full shadow-md fixed bg-white z-50'>
      <div className='w-[90%] md:w-[80%] mx-auto py-3 flex justify-between items-center'>
        <div>
          <a href='/' className='text-lg md:text-3xl font-rochester_regular'>Weather Application</a>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(search); }} className="relative">
          <input
            type='text'
            placeholder="Search..."
            className="shadow border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={search}
            onChange={handleChange}
          />
          <div className='absolute right-[15px] top-[15%]'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          {search !== '' ? suggestions.length > 0 && (
            <ul className="absolute bg-white border rounded-lg shadow-md mt-1 w-full">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : ''}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
