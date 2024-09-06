DO $$ BEGIN
 CREATE TYPE "public"."sign_in_methods" AS ENUM('email', 'google', 'facebook', 'apple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."task_priority" AS ENUM('low', 'medium', 'high');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"village_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"date_and_time" timestamp NOT NULL,
	"is_recurring" boolean NOT NULL,
	"frequency" interval day,
	"people_required" integer NOT NULL,
	"values_associated" text[],
	"task_priority" "task_priority" NOT NULL,
	"completed" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"full_name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"email" text NOT NULL,
	"sign_in_methods" "sign_in_methods" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_tasks" (
	"user_id" text NOT NULL,
	"task_id" integer NOT NULL,
	CONSTRAINT "users_to_tasks_user_id_task_id_pk" PRIMARY KEY("user_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_villages" (
	"user_id" text NOT NULL,
	"village_id" integer NOT NULL,
	CONSTRAINT "users_to_villages_user_id_village_id_pk" PRIMARY KEY("user_id","village_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "villages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" date NOT NULL,
	"values" text[] DEFAULT '{"Love","Joy","Peace","Patience","Kindness","Goodness","Faithfulness"}' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_tasks" ADD CONSTRAINT "users_to_tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_tasks" ADD CONSTRAINT "users_to_tasks_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
