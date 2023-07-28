import { FC } from 'react';
import { FiUser } from 'react-icons/fi';

type ENStateResponse = {
    name: string;
    address: string;
    avatar: string;
    display: string;
};

export const ENSAvatar: FC<{ name: string }> = async ({ name }) => {
    const response = await fetch('https://enstate.rs/n/' + name);
    const data: ENStateResponse = await response.json();

    if (!data.avatar)
        return (
            <div
                className="flex aspect-square h-8 w-8 items-center justify-center rounded-full text-white"
                style={{
                    background:
                        'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%);',
                }}
            >
                <FiUser />
            </div>
        );

    return (
        <img
            src={data.avatar}
            alt={name}
            className="aspect-square h-8 w-8 rounded-full bg-white"
        />
    );
};
