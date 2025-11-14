import type { SchemaDefinition } from '@content/server-database';

/**
 * Adds a publishable field to the provided schema if the schema
 * has the `publishable` option enabled. The field is named `publishedAt`
 * and is nullable datetime.
 *
 * @param schema - The schema definition to mutate
 */
export const addPublishableField = (schema: SchemaDefinition) => {
    if (!schema.options?.publishable) return;
    schema.fields.publishedAt = {
        type: 'datetime',
        nullable: true
    };
};

/**
 * Adds bidirectional relations between the provided schema and the Projects schema.
 *
 * - Adds a `belongsTo` relation field `project` on the provided schema
 * - Adds a `hasMany` relation on the Projects schema using a camelCased collection name
 *
 * If no `projectSchema` is provided, this function is a no-op.
 *
 * @param schema - The schema to attach a `belongsTo` Project relation
 * @param projectSchema - The Projects schema to attach a `hasMany` back-reference
 */
export const addProjectRelations = (
    schema: SchemaDefinition,
    projectSchema?: SchemaDefinition
) => {
    if (!projectSchema) return;

    schema.fields.project = {
        type: 'relation',
        relationType: 'belongsTo',
        target: 'Projects',
        options: {
            foreignKey: 'projectId',
            as: 'project'
        }
    };

    const schemaName = schema.name.charAt(0).toLowerCase() + schema.name.slice(1);
    projectSchema.fields[schemaName] = {
        type: 'relation',
        relationType: 'hasMany',
        target: schema.name,
        options: {
            foreignKey: 'projectId',
            as: schemaName
        }
    };
};

/**
 * Prepares a list of schema definitions by:
 *  - Adding `publishedAt` to publishable schemas
 *  - Wiring up relations with the Projects schema if present
 *
 * Mutates the input schemas in-place.
 *
 * @param schemas - The collection of schemas to prepare
 * @param projectSchema - Optional Projects schema used to add back relations
 */
export const prepareSchemas = (
    schemas: SchemaDefinition[],
    projectSchema?: SchemaDefinition
) => {
    for (const schema of schemas) {
        addPublishableField(schema);
        addProjectRelations(schema, projectSchema);
    }
};


