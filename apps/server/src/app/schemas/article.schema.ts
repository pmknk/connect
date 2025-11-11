import { SchemaDefinition } from "@content/server-database";

export const ArticleSchema: SchemaDefinition = {
    name: 'Articles',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        title: {
            type: 'string',
            nullable: false,
            admin: {
                component: 'text',
                componentProps: {
                    label: 'Title',
                    placeholder: 'Enter the title of the article'
                }
            }
        },
        duration: {
            type: 'integer',
            admin: {
                component: 'number',
                componentProps: {
                    label: 'Duration',
                    placeholder: 'Enter the duration of the article',
                }
            }
        },
        body: {
            type: 'text',
            admin: {
                component: 'textarea',
                componentProps: {
                    placeholder: 'Article body',
                    multiline: true,
                    minRows: 10,
                    maxRows: 10,
                    rows: 10
                }
            }
        },
    },
    options: {
        paranoid: true,
        publishable: true
    }
}