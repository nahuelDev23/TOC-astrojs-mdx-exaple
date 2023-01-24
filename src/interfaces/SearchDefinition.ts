export type SearchDefinition = {
    readonly primary: string;
    readonly secondary?: readonly string[];
    readonly tertiary?: readonly string[];
    readonly url?: string;
};
