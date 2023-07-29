import { FiYoutube } from 'react-icons/fi';

import { parseTag } from './tagutils';

export const SmallTag = ({ tag }: { tag: string }) => {
    const isYoutube = tag === 'youtube';

    const parsed_tag = parseTag(tag);

    return (
        <span className="bg-ens-grey1 text-ens-grey2 flex items-center gap-1 rounded-full px-2 py-1 text-xs">
            {isYoutube && <FiYoutube />}
            {parsed_tag}
        </span>
    );
};
