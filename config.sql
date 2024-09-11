CREATE DATABASE gutu_half_marathon;

CREATE TABLE registration(
	id INT NOT NULL AUTO_INCREMENT,
    date_registered DATETIME DEFAULT CURRENT_TIMESTAMP,
    race_id VARCHAR(18) DEFAULT (UPPER( (SUBSTR( MD5( RAND() ),1,8) ) ) ),
    fname VARCHAR(50) NOT NULL,
    mname VARCHAR(50),
    lname VARCHAR(50) NOT NULL,
	gender VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(64) NOT NULL,
    id_doc VARCHAR(15) NOT NULL,
    id_no VARCHAR(25) NOT NULL,
    pri_mobile VARCHAR(20) NOT NULL,
    sec_mobile VARCHAR(20),
    address VARCHAR(150) NOT NULL,
    event_category VARCHAR(15) NOT NULL,
    emerg_contact_name VARCHAR(60) NOT NULL,
    emerg_contact_mobile VARCHAR(20) NOT NULL,
    event_discovery VARCHAR(100),
    user_consent VARCHAR(5) NOT NULL,
    UNIQUE KEY(race_id),
    PRIMARY KEY(id)
);