-- users table
CREATE TABLE public.users (
  "_id" serial PRIMARY KEY,
  "username" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL
);



-- jobs table
CREATE TABLE public.jobs (
  "_id" serial PRIMARY KEY,
  "user_username" varchar(255) NOT NULL,
  "company_name" varchar(255) NOT NULL,
  "position" varchar(255) NOT NULL,
  "salary" varchar(255),
  "location" varchar(255),
  "date_applied" varchar(255),
  "description" varchar(255),
  "follow_up" boolean,
  "heard_back" boolean,
  FOREIGN KEY ("user_username") REFERENCES public.users("username")
);

--psql -d postgres://axhrluml:m5WdHydoURU3AH2xehgn-CU5wmtqY2Iz@peanut.db.elephantsql.com/axhrluml -f jobhuntr_postgres_create.sql