declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"post": {
"ai-engine-plugin-sicherheitsluecke.md": {
	id: "ai-engine-plugin-sicherheitsluecke.md";
  slug: "ai-engine-plugin-sicherheitsluecke";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"arve-plugin-backdoor.md": {
	id: "arve-plugin-backdoor.md";
  slug: "arve-plugin-backdoor";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"burst-statistics-auth-bypass-wordpress.md": {
	id: "burst-statistics-auth-bypass-wordpress.md";
  slug: "burst-statistics-auth-bypass-wordpress";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"cern-wordpress-enterprise.md": {
	id: "cern-wordpress-enterprise.md";
  slug: "cern-wordpress-enterprise";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"classic-block-bleibt.md": {
	id: "classic-block-bleibt.md";
  slug: "classic-block-bleibt";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"dofollow-backlinks-finden.mdx": {
	id: "dofollow-backlinks-finden.mdx";
  slug: "dofollow-backlinks-finden";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"elementor-bricks-block-editor.md": {
	id: "elementor-bricks-block-editor.md";
  slug: "elementor-bricks-block-editor";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"eu-cyber-resilience-wordpress-vdp.md": {
	id: "eu-cyber-resilience-wordpress-vdp.md";
  slug: "eu-cyber-resilience-wordpress-vdp";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"events-calendar-pro.md": {
	id: "events-calendar-pro.md";
  slug: "events-calendar-pro";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"falsche-seite-rankt.md": {
	id: "falsche-seite-rankt.md";
  slug: "falsche-seite-rankt";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"google-antigravity-webdesign.md": {
	id: "google-antigravity-webdesign.md";
  slug: "google-antigravity-webdesign";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"google-gemini-webdesign.md": {
	id: "google-gemini-webdesign.md";
  slug: "google-gemini-webdesign";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gravity-forms-backdoor.md": {
	id: "gravity-forms-backdoor.md";
  slug: "gravity-forms-backdoor";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gutenberg-components-deprecated.md": {
	id: "gutenberg-components-deprecated.md";
  slug: "gutenberg-components-deprecated";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gutenberg-medien-upload.md": {
	id: "gutenberg-medien-upload.md";
  slug: "gutenberg-medien-upload";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gutenberg-responsive-styling.md": {
	id: "gutenberg-responsive-styling.md";
  slug: "gutenberg-responsive-styling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"ki-ersetzt-plugins.md": {
	id: "ki-ersetzt-plugins.md";
  slug: "ki-ersetzt-plugins";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"kirki-plugin-sicherheitsluecke-cve.md": {
	id: "kirki-plugin-sicherheitsluecke-cve.md";
  slug: "kirki-plugin-sicherheitsluecke-cve";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"monsterinsights-phishing-oauth-sicherheit.md": {
	id: "monsterinsights-phishing-oauth-sicherheit.md";
  slug: "monsterinsights-phishing-oauth-sicherheit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"optinmonster-supply-chain.md": {
	id: "optinmonster-supply-chain.md";
  slug: "optinmonster-supply-chain";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"patchstack-wordpress-sicherheitsbericht.md": {
	id: "patchstack-wordpress-sicherheitsbericht.md";
  slug: "patchstack-wordpress-sicherheitsbericht";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"php-only-blocks-wordpress-7-0.md": {
	id: "php-only-blocks-wordpress-7-0.md";
  slug: "php-only-blocks-wordpress-7-0";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"protect-the-shire-wordpress-sicherheit.md": {
	id: "protect-the-shire-wordpress-sicherheit.md";
  slug: "protect-the-shire-wordpress-sicherheit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"rank-math-yoast-seo.md": {
	id: "rank-math-yoast-seo.md";
  slug: "rank-math-yoast-seo";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"react-19-wordpress-plugins.md": {
	id: "react-19-wordpress-plugins.md";
  slug: "react-19-wordpress-plugins";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"seo-fehler-frankfurt.md": {
	id: "seo-fehler-frankfurt.md";
  slug: "seo-fehler-frankfurt-vermeiden";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"shapedplugin-supply-chain-angriff.md": {
	id: "shapedplugin-supply-chain-angriff.md";
  slug: "shapedplugin-supply-chain-angriff";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"vibe-coding-wordpress-sicherheit.md": {
	id: "vibe-coding-wordpress-sicherheit.md";
  slug: "vibe-coding-wordpress-sicherheit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wann-seo-machen.md": {
	id: "wann-seo-machen.md";
  slug: "wann-seo-machen";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"warum-seo-in-frankfurt.md": {
	id: "warum-seo-in-frankfurt.md";
  slug: "lokale-seo-frankfurt-wichtig";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wasm-bildverarbeitung-wordpress.md": {
	id: "wasm-bildverarbeitung-wordpress.md";
  slug: "wasm-bildverarbeitung-wordpress";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"woocommerce-11-0-release.md": {
	id: "woocommerce-11-0-release.md";
  slug: "woocommerce-11-0-release";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"woocommerce-checkout-blocks.md": {
	id: "woocommerce-checkout-blocks.md";
  slug: "woocommerce-checkout-blocks";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"woocommerce-ladezeit.md": {
	id: "woocommerce-ladezeit.md";
  slug: "woocommerce-ladezeit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"woocommerce-update-live.md": {
	id: "woocommerce-update-live.md";
  slug: "woocommerce-update-live";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordcamp-europe-krakau.md": {
	id: "wordcamp-europe-krakau.md";
  slug: "wordcamp-europe-krakau";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordcamp-us-phoenix.md": {
	id: "wordcamp-us-phoenix.md";
  slug: "wordcamp-us-phoenix";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-2fa-einrichten.md": {
	id: "wordpress-2fa-einrichten.md";
  slug: "wordpress-2fa-einrichten";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-69-update-chaos.md": {
	id: "wordpress-69-update-chaos.md";
  slug: "wordpress-69-update-chaos";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-69-update-probleme.md": {
	id: "wordpress-69-update-probleme.md";
  slug: "wordpress-69-update-probleme";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-3-sicherheitsupdate.md": {
	id: "wordpress-7-0-3-sicherheitsupdate.md";
  slug: "wordpress-7-0-3-sicherheitsupdate";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-admin-redesign.md": {
	id: "wordpress-7-0-admin-redesign.md";
  slug: "wordpress-7-0-admin-redesign";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-ai-sdk-core.md": {
	id: "wordpress-7-0-ai-sdk-core.md";
  slug: "wordpress-7-0-ai-sdk-core";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-armstrong.md": {
	id: "wordpress-7-0-armstrong.md";
  slug: "wordpress-7-0-armstrong";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-echtzeit-kollaboration-ki.md": {
	id: "wordpress-7-0-echtzeit-kollaboration-ki.md";
  slug: "wordpress-7-0-echtzeit-kollaboration-ki";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-echtzeit-kollaboration.md": {
	id: "wordpress-7-0-echtzeit-kollaboration.md";
  slug: "wordpress-7-0-echtzeit-kollaboration";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-0-plugin-kompatibilitaet.md": {
	id: "wordpress-7-0-plugin-kompatibilitaet.md";
  slug: "wordpress-7-0-plugin-kompatibilitaet";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-1-bestaetigte-features.md": {
	id: "wordpress-7-1-bestaetigte-features.md";
  slug: "wordpress-7-1-bestaetigte-features";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-1-beta-testen.md": {
	id: "wordpress-7-1-beta-testen.md";
  slug: "wordpress-7-1-beta-testen";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-1-release.md": {
	id: "wordpress-7-1-release.md";
  slug: "wordpress-7-1-release";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-1-roadmap.md": {
	id: "wordpress-7-1-roadmap.md";
  slug: "wordpress-7-1-roadmap";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-no-collaboration.md": {
	id: "wordpress-7-no-collaboration.md";
  slug: "wordpress-7-no-collaboration";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-7-php-update-pflicht.md": {
	id: "wordpress-7-php-update-pflicht.md";
  slug: "wordpress-7-php-update-pflicht";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-70-ki-api-schluessel-sicherheit.md": {
	id: "wordpress-70-ki-api-schluessel-sicherheit.md";
  slug: "wordpress-70-ki-api-schluessel-sicherheit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-701-update.md": {
	id: "wordpress-701-update.md";
  slug: "wordpress-701-update";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-704-ghostscript-rce.md": {
	id: "wordpress-704-ghostscript-rce.md";
  slug: "wordpress-704-ghostscript-rce";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-71-neue-blocks.md": {
	id: "wordpress-71-neue-blocks.md";
  slug: "wordpress-71-neue-blocks";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-71-neue-funktionen.md": {
	id: "wordpress-71-neue-funktionen.md";
  slug: "wordpress-71-neue-funktionen";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-71-rc1.md": {
	id: "wordpress-71-rc1.md";
  slug: "wordpress-71-rc1";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-71-react-migration.md": {
	id: "wordpress-71-react-migration.md";
  slug: "wordpress-71-react-migration";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-71-responsive-styling.md": {
	id: "wordpress-71-responsive-styling.md";
  slug: "wordpress-71-responsive-styling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-abilities-api-7-1.md": {
	id: "wordpress-abilities-api-7-1.md";
  slug: "wordpress-abilities-api-7-1";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-accordion-block.md": {
	id: "wordpress-accordion-block.md";
  slug: "wordpress-accordion-block";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-armstrong-ki-dashboard.md": {
	id: "wordpress-armstrong-ki-dashboard.md";
  slug: "wordpress-armstrong-ki-dashboard";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-backup-strategie.md": {
	id: "wordpress-backup-strategie.md";
  slug: "wordpress-backup-strategie";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-block-themes-fse.md": {
	id: "wordpress-block-themes-fse.md";
  slug: "wordpress-block-themes-fse";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-core-funktionen.md": {
	id: "wordpress-core-funktionen.md";
  slug: "wordpress-core-funktionen";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-dashboard-anpassbar-gutenberg.md": {
	id: "wordpress-dashboard-anpassbar-gutenberg.md";
  slug: "wordpress-dashboard-anpassbar-gutenberg";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-dsgvo-checkliste.md": {
	id: "wordpress-dsgvo-checkliste.md";
  slug: "wordpress-dsgvo-checkliste";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-email-zustellbarkeit.md": {
	id: "wordpress-email-zustellbarkeit.md";
  slug: "wordpress-email-zustellbarkeit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-feature-clips.md": {
	id: "wordpress-feature-clips.md";
  slug: "wordpress-feature-clips";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-formulare-spam-schutz.md": {
	id: "wordpress-formulare-spam-schutz.md";
  slug: "wordpress-formulare-spam-schutz";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-guidelines-markenstimme.md": {
	id: "wordpress-guidelines-markenstimme.md";
  slug: "wordpress-guidelines-markenstimme";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-iframe-editor.md": {
	id: "wordpress-iframe-editor.md";
  slug: "wordpress-iframe-editor";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-interactivity-api.md": {
	id: "wordpress-interactivity-api.md";
  slug: "wordpress-interactivity-api";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-ki-plugins-vergleich.md": {
	id: "wordpress-ki-plugins-vergleich.md";
  slug: "wordpress-ki-plugins-vergleich";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-ki-plugins.md": {
	id: "wordpress-ki-plugins.md";
  slug: "wordpress-ki-plugins";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-managed-hosting.md": {
	id: "wordpress-managed-hosting.md";
  slug: "wordpress-managed-hosting";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-marktanteil-rueckgang.md": {
	id: "wordpress-marktanteil-rueckgang.md";
  slug: "wordpress-marktanteil-rueckgang";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-marktanteil-sinkt-weiter.md": {
	id: "wordpress-marktanteil-sinkt-weiter.md";
  slug: "wordpress-marktanteil-sinkt-weiter";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-mcp-adapter-ki-agenten.md": {
	id: "wordpress-mcp-adapter-ki-agenten.md";
  slug: "wordpress-mcp-adapter-ki-agenten";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-performance-plugins-benchmark.md": {
	id: "wordpress-performance-plugins-benchmark.md";
  slug: "wordpress-performance-plugins-benchmark";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-playground-browser.md": {
	id: "wordpress-playground-browser.md";
  slug: "wordpress-playground-browser";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-plugin-bloat-performance.md": {
	id: "wordpress-plugin-bloat-performance.md";
  slug: "wordpress-plugin-bloat-performance";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-plugin-business-krise.md": {
	id: "wordpress-plugin-business-krise.md";
  slug: "wordpress-plugin-business-krise";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-plugin-sicherheit-mai.md": {
	id: "wordpress-plugin-sicherheit-mai.md";
  slug: "wordpress-plugin-sicherheit-mai";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-plugin-sicherheitskrise.md": {
	id: "wordpress-plugin-sicherheitskrise.md";
  slug: "wordpress-plugin-sicherheitskrise";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-react-19-revert.md": {
	id: "wordpress-react-19-revert.md";
  slug: "wordpress-react-19-revert";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-sicherheit.md": {
	id: "wordpress-sicherheit.md";
  slug: "wordpress-sicherheit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-staging-umgebung.md": {
	id: "wordpress-staging-umgebung.md";
  slug: "wordpress-staging-umgebung";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-supply-chain-angriff-essential-plugins.md": {
	id: "wordpress-supply-chain-angriff-essential-plugins.md";
  slug: "wordpress-supply-chain-angriff-essential-plugins";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-supply-chain-angriff.md": {
	id: "wordpress-supply-chain-angriff.md";
  slug: "wordpress-supply-chain-angriff";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wordpress-wartungsvertrag-kosten.md": {
	id: "wordpress-wartungsvertrag-kosten.md";
  slug: "wordpress-wartungsvertrag-kosten";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wp-engine-automattic-klage.md": {
	id: "wp-engine-automattic-klage.md";
  slug: "wp-engine-automattic-klage";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wp-engine-automattic-prozess-juli.md": {
	id: "wp-engine-automattic-prozess-juli.md";
  slug: "wp-engine-automattic-prozess-juli";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wp2shell-angriffswelle-recovery.md": {
	id: "wp2shell-angriffswelle-recovery.md";
  slug: "wp2shell-angriffswelle-recovery";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wp2shell-rce-wordpress-patch.md": {
	id: "wp2shell-rce-wordpress-patch.md";
  slug: "wp2shell-rce-wordpress-patch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wp2shell-wordpress-sicherheit.md": {
	id: "wp2shell-wordpress-sicherheit.md";
  slug: "wp2shell-wordpress-sicherheit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wpml-polylang-vergleich.md": {
	id: "wpml-polylang-vergleich.md";
  slug: "wpml-polylang-vergleich";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
