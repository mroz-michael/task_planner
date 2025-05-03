/*queries used to create db/tables */

create database if not exists task_manager;

/** DB for Testing:**/
create database if not exists task_manager_test;


/** Tables existing in both DBs **/
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(50) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
)
