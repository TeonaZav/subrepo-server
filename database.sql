CREATE DATABASE todo_app;
CREATE TABLE todos(
  id SERIAL PRIMARY KEY,
  text TEXT,
  status TEXT
);