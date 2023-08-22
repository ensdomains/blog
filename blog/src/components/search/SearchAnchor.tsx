import { CrossSVG, MagnifyingGlassSVG } from '../ClientIcons';
import { SearchBar } from './SearchBar';
import { SearchButton } from './SearchButton';

export const SearchAnchor = () => {
    return (
        <div
            className="group z-30 flex flex-1 justify-between"
            id="search_system"
        >
            <input id="search_open" type="checkbox" className="opacity-0" />
            <div className="interest-within:block sm:interest-within:hidden absolute inset-0 hidden h-screen bg-black/10 backdrop-blur-sm"></div>
            <div className="interest-within:block absolute inset-x-0 top-5 hidden w-full sm:static sm:block">
                <div className="w-full px-4">
                    <SearchBar />
                </div>
            </div>
            <div className="text-ens-grey2 flex flex-1 items-center justify-end gap-2 sm:hidden">
                <SearchButton
                    variant="close"
                    className="hover:bg-ens-grey2/20 interest-within:flex hidden items-center rounded-full p-2"
                >
                    <CrossSVG />
                </SearchButton>
                <SearchButton
                    variant="open"
                    className="hover:bg-ens-grey2/20 interest-within:hidden flex items-center rounded-full p-2"
                >
                    <MagnifyingGlassSVG />
                </SearchButton>
            </div>
        </div>
    );
};
