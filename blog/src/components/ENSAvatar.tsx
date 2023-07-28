import Image from 'next/image';
import { FC } from 'react';

type ENStateResponse = {
    name: string;
    address: string;
    avatar: string;
    display: string;
};

export const ENSAvatar: FC<{ name: string }> = async ({ name }) => {
    const response = await fetch('https://enstate.rs/n/' + name);
    const data: ENStateResponse = await response.json();

    return (
        <Image
            src={data.avatar}
            alt={name}
            width={16}
            height={16}
            className="aspect-square h-8 w-8 rounded-full"
        />
    );
};
