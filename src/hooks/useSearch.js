import { useState } from 'react';
import { searchFacility } from '../remotes';

export default function useSearch() {
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchedList, setSearchedList] = useState([]);

  const handleSearch = async (value) => {
    setSearchStatus('loading');
    const { data } = await searchFacility({ q: value });
    setSearchedList(data);
    setSearchStatus('complete');
  };

  return {
    searchStatus,
    searchedList,
    handleSearch,
  };
}
