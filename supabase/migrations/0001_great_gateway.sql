DO $$ BEGIN
 CREATE TYPE "public"."sign_in_methods" AS ENUM('email', 'google', 'facebook', 'apple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"people_required" integer NOT NULL,
	"priority" varchar NOT NULL,
	"completed" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_to_villages" DROP CONSTRAINT "users_to_villages_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_villages" DROP CONSTRAINT "users_to_villages_village_id_villages_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "sign_in_methods" SET DATA TYPE sign_in_methods USING ("sign_in_methods"::sign_in_methods);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_villages" ADD CONSTRAINT "users_to_villages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_villages" ADD CONSTRAINT "users_to_villages_village_id_villages_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
