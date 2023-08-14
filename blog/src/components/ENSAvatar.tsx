import { FC } from 'react';
import { FiUser } from 'react-icons/fi';

type ENStateResponse = {
    name: string;
    address: string;
    avatar: string;
    display: string;
};

const ensHasAvatar = async (url) => (await fetch(url, { method: "HEAD" })).status === 200;

export const ENSAvatar: FC<{ name: string }> = async ({ name }) => {
    const response = await fetch('https://enstate.rs/n/' + name);
    const data: ENStateResponse | undefined = await response
        .json()
        .then((data) => data)
        .catch((error) => {
            console.error(error);
        });

    const ensUrl = `https://metadata.ens.domains/mainnet/avatar/${name}`;

    if (!data?.avatar && !(await ensHasAvatar(ensUrl))) {
        return (
            <div
                className="flex aspect-square h-8 w-8 items-center justify-center rounded-full text-white"
                style={{
                    background:
                        'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
                }}
            >
                <FiUser />
            </div>
        );
    }

    return (
        <img
            src={data?.avatar ? data.avatar : ensUrl}
            alt={name}
            className="aspect-square h-8 w-8 rounded-full bg-white"
        />
    );
};
