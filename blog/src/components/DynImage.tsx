const extractFilename = (path: string) => {
    // blog/blog/.next/server/_rsc_content_001_ens_cards_devcon_readme_mdx.js
    // 001_ens_cards_devcon
    const path2 = path.split('/');
    const last_segment_of_path = path2[path2.length - 1];

    return last_segment_of_path
        .replace('_rsc_content_', '')
        .replace('_readme_mdx.js', '');
};

export const DynImage = async (properties) => {
    const filename = extractFilename(__filename);
    // const imagepath = join(
    //     '../../../content/' + filename + '/' + properties.src
    // );

    const imagepath = '../../../content/001_ens_cards_devcon/01.webp';

    // const object = await import(imagepath);

    // {default: {src: ".next/imsdf/ljskdjflksdjflkdsjflksjdl.webp"}}

    return (
        <span className="not-prose block w-full border">
            {/* <span className="block p-2">
                <span className="block">{JSON.stringify(properties)}</span>
                <span className="block">{imagepath}</span>
            </span> */}
            {/* {JSON.stringify(object)}
            {imagepath}*/}
            <img src={properties.src} alt="" className="w-full" />
        </span>
    );
};
