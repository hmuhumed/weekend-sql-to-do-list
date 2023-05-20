CREATE TABLE "to_do_list" (
"id" SERIAL PRIMARY KEY,
"todo" VARCHAR(50),
"completed" BOOLEAN DEFAULT FALSE
);



INSERT INTO "to_do_list" ("todo") VALUES ('Go to the gym!');

SELECT * FROM "to_do_list";
