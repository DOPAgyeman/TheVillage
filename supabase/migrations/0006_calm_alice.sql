DO $$ BEGIN
 CREATE TYPE "public"."task_priority" AS ENUM('low', 'medium', 'high');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "priority" TO "task_priority";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "task_priority" SET DATA TYPE task_priority USING ("task_priority"::task_priority);