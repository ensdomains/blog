export const DynImage = async (properties) => {
    return (
        <span className="not-prose block w-full border">
            {/* <span className="block p-2">
                <span className="block">{JSON.stringify(properties)}</span>
                <span className="block">{imagepath}</span>
            </span> */}
            <img src={properties.src} alt={properties.alt} className="w-full" />
        </span>
    );
};
