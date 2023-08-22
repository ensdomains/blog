import { FiYoutube } from 'react-icons/fi';

import { parseTag } from './tagutils';

export const BigTag = ({ tag }: { tag: string }) => {
    const isYoutube = tag === 'youtube';

    const parsed_tag = parseTag(tag);

    return (
        <a
            href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
            className="text-ens-blue flex items-center gap-1 rounded-full bg-white px-2 text-base font-bold transition hover:scale-105"
        >
            {isYoutube && <FiYoutube />}
            {parsed_tag}
        </a>
    );
};
