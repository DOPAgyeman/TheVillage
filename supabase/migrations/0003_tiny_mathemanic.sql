ALTER TABLE "users" RENAME COLUMN "email" TO "email_address";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "sign_in_methods" TO "external_accounts";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "external_accounts" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "external_accounts" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "external_accounts" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image_url" text;