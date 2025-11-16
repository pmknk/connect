/**
 * Converts a schema name like "ChallengesTemplates" or "challengesTemplates"
 * into an API slug like "challenges-templates".
 */
export const nameToApiSlug = (name: string): string => {
    if (!name) return '';
    return name
        // Insert hyphen between lowercase/number and uppercase letter boundaries
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        // Replace spaces and underscores with hyphens
        .replace(/[\s_]+/g, '-')
        // Collapse multiple hyphens
        .replace(/-+/g, '-')
        // Trim leading/trailing hyphens
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
};


