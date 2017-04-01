DROP TABLE IF EXISTS snippets;

CREATE TABLE snippets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  tags TEXT[]
);

INSERT INTO snippets(name, description, author, language, code, tags)
  VALUES ('Hello World', 'print a String value', 'john', 'Java', 'System.out.println("Hello World");', '{"simple", "beginner", "print"}');
