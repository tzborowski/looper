CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`city` text NOT NULL,
	`district` text,
	`role` text NOT NULL,
	`problem` text,
	`referrals` integer DEFAULT 0 NOT NULL,
	`ambassador` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);
