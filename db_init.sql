DROP TABLE IF EXISTS snippets;

CREATE TABLE snippets (
  id INT PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  author VARCHAR NOT NULL,
  language VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  tags VARCHAR[] NOT NULL

);

INSERT INTO snippets VALUES(
  12346789,
  'Hello World',
  'print a String Value',
  'john',
  'Java',
  'System.println("Hello World");',
  '{"simple", "beginner","print"}'
);


