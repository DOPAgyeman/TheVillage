CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"full_name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"email" text NOT NULL,
	"sign_in_methods" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_villages" (
	"user_id" integer NOT NULL,
	"village_id" integer NOT NULL,
	CONSTRAINT "users_to_villages_user_id_village_id_pk" PRIMARY KEY("user_id","village_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "villages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" date NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_villages" ADD CONSTRAINT "users_to_villages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_villages" ADD CONSTRAINT "users_to_villages_village_id_villages_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
