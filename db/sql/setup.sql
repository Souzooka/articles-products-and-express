--create DB
DROP DATABASE IF EXISTS articles_and_products;
CREATE DATABASE articles_and_products;

\c articles_and_products

--create tables
CREATE TABLE IF NOT EXISTS articles
(
  title VARCHAR(255) NOT NULL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  content VARCHAR(65535) NOT NULL
);

CREATE TABLE IF NOT EXISTS products
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price MONEY NOT NULL,
  inventory INT NOT NULL
);

--insert some data
INSERT INTO articles (title, author, content) VALUES
('Man finds cats', 'Weeping Angel', 'Lorem Ipsum'),
('Raw food found Dangerous: the Disaster Report', 'IREM', 'memes');

INSERT INTO products (name, price, inventory) VALUES
('Shamwow', 89.99, 90),
('Dr.Pepper', 1.25, 0);

\c souzooka