CREATE TABLE IF NOT EXISTS Task (
  id INT UNSIGNED AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
)