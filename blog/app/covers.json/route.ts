import { covers } from 'assets/assets';
import { NextResponse } from 'next/server';

export async function GET() {
    // Convert to object of {postName: coverUrl} pairs
    const data = Object.fromEntries(
        await Promise.all(
            Object.keys(covers).map(
                async (key) =>
                    // Convert to array of [postName, coverUrl] pairs
                    [
                        key,
                        await covers[key as keyof typeof covers].cover.then(
                            (cover) => cover.default.src
                        ),
                    ] as [string, string]
            )
        )
    );

    return NextResponse.json(data);
}
