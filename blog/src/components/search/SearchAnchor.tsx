import { CrossSVG, MagnifyingGlassSVG } from '../ClientIcons';
import { Backdrop } from './Backdrop';
import { SearchBar } from './SearchBar';
import { SearchButton } from './SearchButton';

export const SearchAnchor = () => {
    return (
        <div
            className="group z-30 flex flex-1 justify-between"
            id="search_system"
        >
            <Backdrop />
            <div className="interest-within:block absolute inset-x-0 top-5 hidden w-full sm:static sm:block">
                <div className="w-full px-4 sm:px-0">
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
