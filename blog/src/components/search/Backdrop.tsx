'use client';

export const Backdrop = () => {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className="interest-within:block sm:interest-within:hidden absolute inset-0 hidden h-screen bg-black/10 backdrop-blur-sm"
            onClick={() => {
                const search = document.querySelector('#search_open');

                search?.setAttribute('checked', 'false');
            }}
            onKeyDown={() => {}}
        ></div>
    );
};
