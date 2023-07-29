import { FiSearch } from 'react-icons/fi';

import { SearchResults } from './SearchResults';

export const SearchBar = () => {
    return (
        <div className="relative">
            <div className="relative h-12">
                <div className="absolute flex h-full items-center pl-4">
                    <FiSearch focusable={false} />
                </div>
                <input
                    type="search"
                    className="focus:border-ens-blue focus:outline-ens-blue h-full w-80 rounded-full border bg-white py-1 pl-12 pr-10"
                    placeholder="Search for a post"
                    id="search"
                />
            </div>
            <SearchResults />
        </div>
    );
};
