-- users table
CREATE TABLE public.users (
  "_id" serial PRIMARY KEY,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL
);



-- jobs table
CREATE TABLE public.jobs (
  "_id" serial PRIMARY KEY,
  "user_id" INT,
  "company_name" varchar(255) NOT NULL,
  "position" varchar(255) NOT NULL,
  "salary" varchar(255),
  "location" varchar(255),
  "date applied" varchar(255),
  "follow-up" boolean,
  "heard-back" boolean,
  FOREIGN KEY ("user_id") REFERENCES public.users("_id")
);

