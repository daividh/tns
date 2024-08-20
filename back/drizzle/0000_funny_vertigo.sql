CREATE SCHEMA "tns";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tns"."Posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"authorId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tns"."UserAccount" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	CONSTRAINT "UserAccount_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tns"."Posts" ADD CONSTRAINT "Posts_authorId_UserAccount_id_fk" FOREIGN KEY ("authorId") REFERENCES "tns"."UserAccount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
