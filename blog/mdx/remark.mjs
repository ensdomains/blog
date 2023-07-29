/* eslint-disable unicorn/no-null */
import { mdxAnnotations } from 'mdx-annotations';
import gfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

/**
 * @type {import('unified').Plugin}
 */
export const remarkImportAsNextImages = () => {
    return async (tree, file) => {
        visit(tree, async (node, index, parent) => {
            if (!node.type === 'paragraph') return;

            /**
             * @type {import('unist').Node | undefined}
             */
            const firstChild = node.children?.at(0);

            if (!firstChild) return;

            // Match !(This is an alt text)[./01.webp]
            const match = /^!\((.*?)\)\[(.*?)]$/g.exec(firstChild.value);

            if (!match) return;

            // eslint-disable-next-line unicorn/prevent-abbreviations
            const [_, alt, src] = match;

            if (!src.startsWith('./')) return;

            const newNode = {
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
                                                                ...(alt !== ''
                                                                    ? [
                                                                          {
                                                                              type: 'JSXAttribute',
                                                                              name: {
                                                                                  type: 'JSXIdentifier',
                                                                                  name: 'alt',
                                                                              },
                                                                              value: {
                                                                                  type: 'Literal',
                                                                                  value: alt,
                                                                              },
                                                                          },
                                                                      ]
                                                                    : []),
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
                                                        closingElement: null,
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
                                                value: src,
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

            parent.children[index] = newNode;
        });
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
