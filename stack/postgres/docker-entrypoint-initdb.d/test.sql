CREATE DATABASE tns;

\c tns;

CREATE TABLE person (
    id      SERIAL  PRIMARY KEY,
    email   TEXT NOT NULL
);

INSERT INTO person (email) VALUES ('a@a.com');
INSERT INTO person (email) VALUES ('b@b.com');
INSERT INTO person (email) VALUES ('c@c.com');
INSERT INTO person (email) VALUES ('d@d.com');

SELECT * FROM person;