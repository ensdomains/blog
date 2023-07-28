import { FiYoutube } from 'react-icons/fi';

export const Youtube = ({ src }) => {
    return (
        <div className="not-prose w-full">
            <div className="w-full overflow-hidden rounded-xl">
                <iframe
                    className="not-prose !m-0 aspect-video w-full"
                    src={'https://www.youtube-nocookie.com/embed/' + src}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            <a
                href={`https://youtu.be/${src}`}
                target="_blank"
                className="text-ens-blue float-right flex cursor-pointer items-center gap-1 hover:underline"
            >
                <FiYoutube /> View on Youtube
            </a>
        </div>
    );
};
