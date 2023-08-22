import { CrossSVG, MagnifyingGlassSVG } from '../ClientIcons';
import { SearchBar } from './SearchBar';
import { SearchButton } from './SearchButton';

export const SearchAnchor = () => {
    return (
        <div className="group flex flex-1 justify-between">
            <input id="search_open" type="checkbox" />
            <div className="absolute inset-0 hidden h-screen bg-black/10 backdrop-blur-sm group-focus-within:block sm:hidden"></div>
            <div className="absolute inset-x-0 top-5 hidden w-full group-focus-within:block sm:static">
                <div className="w-full px-4">
                    <SearchBar />
                </div>
            </div>
            <div className="text-ens-grey2 flex flex-1 items-center justify-end gap-2 sm:hidden">
                <SearchButton
                    variant="close"
                    className="hover:bg-ens-grey2/20 hidden items-center rounded-full p-2 focus-within:flex"
                >
                    <CrossSVG />
                </SearchButton>
                <SearchButton
                    variant="open"
                    className="hover:bg-ens-grey2/20 flex items-center rounded-full p-2 focus-within:hidden"
                >
                    <MagnifyingGlassSVG />
                </SearchButton>
            </div>
        </div>
    );
};
