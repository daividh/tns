ALTER TABLE "tns"."Posts" RENAME TO "Post";--> statement-breakpoint
ALTER TABLE "tns"."Post" DROP CONSTRAINT "Posts_authorId_UserAccount_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tns"."Post" ADD CONSTRAINT "Post_authorId_UserAccount_id_fk" FOREIGN KEY ("authorId") REFERENCES "tns"."UserAccount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
