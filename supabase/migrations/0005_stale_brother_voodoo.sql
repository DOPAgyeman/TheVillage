CREATE TABLE IF NOT EXISTS "users_to_tasks" (
	"user_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	CONSTRAINT "users_to_tasks_user_id_task_id_pk" PRIMARY KEY("user_id","task_id")
);
--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "date" TO "date_and_time";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "date_and_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "village_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "is_recurring" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "frequency" interval day;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "values_associated" text[];--> statement-breakpoint
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
