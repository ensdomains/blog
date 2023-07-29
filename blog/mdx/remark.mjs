/* eslint-disable no-extra-boolean-cast */
/* eslint-disable unicorn/no-null */
import { mdxAnnotations } from 'mdx-annotations';
import gfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

/**
 * Extracts key-value pairs from a string surrounded by square brackets [].
 *
 * @param {string} input - The input string containing key-value pairs inside [].
 * @returns {Record<string, string | number> | undefined} An object representing the extracted key-value pairs, or null if the input is invalid.
 */
const extractKeyValuePairs = (input) => {
    const regex = /^\[(.*)]\s?/; // Regular expression to match key-value pairs inside square brackets
    const matches = input.match(regex);

    if (!matches) {
        return; // The input is not surrounded by []
    }

    const keyValuePairsString = matches[1];
    const keyValuePairsRegex = /(\w+)\s*=\s*(?:"([^"]+)"|(\d+))/g;
    const keyValuePairs = {};

    let pairMatch;

    while (
        (pairMatch = keyValuePairsRegex.exec(keyValuePairsString)) !== null
    ) {
        const [, key, valueString, numericValueString] = pairMatch;
        const value =
            valueString !== undefined
                ? valueString
                : Number(numericValueString);

        keyValuePairs[key] = value;
    }

    return keyValuePairs;
};

/**
 * @type {import('unified').Plugin}
 */
export const remarkImportAsNextImages = () => {
    /**
     * @param {import('unist').Parent} tree
     */
    return async (tree, file) => {
        if (
            file.path !==
            '/home/jakob/dev/v3xlabs/ens-blog/content/001_ens_cards_devcon/readme.mdx'
        )
            return;

        visit(
            tree,
            /**
             * @param {import('unist').Parent} node
             */
            async (node, index, parent) => {
                if (node.type !== 'paragraph') return;

                /**
                 * @type {import('unist').Node | undefined}
                 */
                const imageNode = node.children.at(0);

                if (!imageNode) return;

                if (imageNode.type !== 'image') return;

                // Only process local images
                if (!imageNode.url.startsWith('./')) return;

                const attributes = [];

                if (!!imageNode.alt)
                    attributes.push({
                        type: 'JSXAttribute',
                        name: {
                            type: 'JSXIdentifier',
                            name: 'alt',
                        },
                        value: {
                            type: 'Literal',
                            value: imageNode.alt,
                        },
                    });

                if (!!imageNode.title)
                    attributes.push({
                        type: 'JSXAttribute',
                        name: {
                            type: 'JSXIdentifier',
                            name: 'title',
                        },
                        value: {
                            type: 'Literal',
                            value: imageNode.title,
                        },
                    });

                /**
                 * @type {import('unist').Node | undefined}
                 */
                const nextNode = node.children.at(1);

                const keyValuePairs =
                    nextNode && nextNode.type === 'text'
                        ? extractKeyValuePairs(nextNode.value)
                        : undefined;

                for (const [key, value] of Object.entries(
                    keyValuePairs || {}
                )) {
                    attributes.push({
                        type: 'JSXAttribute',
                        name: {
                            type: 'JSXIdentifier',
                            name: key,
                        },
                        value: {
                            type: 'Literal',
                            value,
                        },
                    });
                }

                const newImageNode = {
                    type: 'mdxFlowExpression',
                    data: {
                        estree: {
                            type: 'Program',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'ArrowFunctionExpression',
                                            id: null,
                                            expression: false,
                                            generator: false,
                                            async: true,
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                },
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'JSXElement',
                                                            openingElement: {
                                                                type: 'JSXOpeningElement',
                                                                attributes: [
                                                                    ...attributes,
                                                                    {
                                                                        type: 'JSXAttribute',
                                                                        name: {
                                                                            type: 'JSXIdentifier',
                                                                            name: 'src',
                                                                        },
                                                                        value: {
                                                                            type: 'JSXExpressionContainer',
                                                                            expression:
                                                                                {
                                                                                    type: 'ChainExpression',
                                                                                    expression:
                                                                                        {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'MemberExpression',
                                                                                                object: {
                                                                                                    type: 'AwaitExpression',
                                                                                                    argument:
                                                                                                        {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'x',
                                                                                                        },
                                                                                                },
                                                                                                property:
                                                                                                    {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'default',
                                                                                                    },
                                                                                                computed: false,
                                                                                                optional: true,
                                                                                            },
                                                                                            property:
                                                                                                {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'src',
                                                                                                },
                                                                                            computed: false,
                                                                                            optional: true,
                                                                                        },
                                                                                },
                                                                        },
                                                                    },
                                                                ],
                                                                name: {
                                                                    type: 'JSXIdentifier',
                                                                    name: 'img',
                                                                },
                                                                selfClosing: true,
                                                            },
                                                            closingElement:
                                                                null,
                                                            children: [],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                        arguments: [
                                            {
                                                type: 'ImportExpression',
                                                source: {
                                                    type: 'Literal',
                                                    value: imageNode.url,
                                                },
                                            },
                                        ],
                                        optional: false,
                                    },
                                },
                            ],
                            sourceType: 'module',
                        },
                    },
                };

                if (keyValuePairs) {
                    nextNode.value = nextNode.value.replace(/^\[(.*)]\s?/, '');

                    if (nextNode.value === '') {
                        node.children.splice(1, 1);
                    }
                }

                if (node.children.length === 1) {
                    parent.children.splice(index, 1, newImageNode);
                } else {
                    node.children.splice(0, 1);
                    parent.children.splice(index, 0, newImageNode);
                }
            }
        );
    };
};

export const remarkPlugins = [
    /**
     * Add support for annotations to MDX.
     * An annotation is a JavaScript object associated with an MDX node. The object properties are passed to the resulting JSX element as props.
     * @see https://www.npmjs.com/package/mdx-annotations
     */
    mdxAnnotations.remark,
    /**
     * Add support for GitHub Flavored Markdown.
     */
    gfm,
    remarkImportAsNextImages,
];
