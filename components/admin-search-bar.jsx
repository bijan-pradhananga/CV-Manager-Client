'use client'
import { useState, useEffect } from 'react';
import { Input } from './ui/input';

const Search = ({ fetchItems, searchItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear the previous timeout if the user is still typing
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // If there's a search term, start the search request after a delay
    if (value.length > 0) {
      setTypingTimeout(setTimeout(() => {
        searchItems(value); // Call searchItems passed as prop
      }, 500));
    } else {
      fetchItems(); // Call fetchItems passed as prop
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="md:w-[100px] lg:w-[300px] bg-white"
      />
    </div>
  );
};

export default Search;
