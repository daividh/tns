CREATE DATABASE tns;

\c tns;

CREATE TABLE UserAccount (
    id      SERIAL  PRIMARY KEY,
    email   TEXT NOT NULL,
    "password" TEXT NULL
);

INSERT INTO UserAccount (email) VALUES ('a@a.com');
INSERT INTO UserAccount (email) VALUES ('b@b.com');
INSERT INTO UserAccount (email) VALUES ('c@c.com');
INSERT INTO UserAccount (email) VALUES ('d@d.com');

SELECT * FROM UserAccount;