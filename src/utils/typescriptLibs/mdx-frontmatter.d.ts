declare module "*.mdx" {
	export { default } from "*.mdx";
	export const frontmatter: Record<string, string>;
}
