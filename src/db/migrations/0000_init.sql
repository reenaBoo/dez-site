CREATE TYPE "public"."article_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "article_slug_history" (
	"slug" text PRIMARY KEY NOT NULL,
	"article_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"cover_image" jsonb,
	"card_size" text DEFAULT 'm' NOT NULL,
	"content" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"accent_color" text,
	"show_atmosphere" boolean DEFAULT true NOT NULL,
	"status" "article_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"og_image" text,
	"reading_time" integer DEFAULT 1 NOT NULL,
	"related_services" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"variants" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"size" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article_slug_history" ADD CONSTRAINT "article_slug_history_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "articles_status_published_idx" ON "articles" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "articles_featured_idx" ON "articles" USING btree ("is_featured");