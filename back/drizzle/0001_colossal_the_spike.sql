CREATE TABLE IF NOT EXISTS "tns"."Address" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"userId" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tns"."Address" ADD CONSTRAINT "Address_userId_UserAccount_id_fk" FOREIGN KEY ("userId") REFERENCES "tns"."UserAccount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
