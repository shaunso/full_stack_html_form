CREATE DATABASE gutu_half_marathon;

CREATE TABLE gutu_half_marathon.registration(
	id INT NOT NULL AUTO_INCREMENT,
	date_registered DATETIME DEFAULT CURRENT_TIMESTAMP,
  race_id VARCHAR(8),
  lname VARCHAR(50) NOT NULL,
  fname VARCHAR(80) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  age INT NOT NULL,
  event_category VARCHAR(15) NOT NULL,
  date_of_birth_YYYY_MM_DD DATE NOT NULL,
  id_doc VARCHAR(15) NOT NULL,
  id_no VARCHAR(25) NOT NULL,
  pri_mobile VARCHAR(20) NOT NULL,
  email VARCHAR(64) NOT NULL,
  address VARCHAR(150) NOT NULL,
  sec_mobile VARCHAR(20),
  emerg_contact_name VARCHAR(80) NOT NULL,
  emerg_contact_mobile VARCHAR(20) NOT NULL,
  event_discovery VARCHAR(100),
  user_consent TINYINT NOT NULL,
  UNIQUE KEY(race_id),
  PRIMARY KEY(id)
);

USE gutu_half_marathon;