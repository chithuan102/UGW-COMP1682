-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: final_year_db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chain`
--

DROP TABLE IF EXISTS `chain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chain` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chain`
--

LOCK TABLES `chain` WRITE;
/*!40000 ALTER TABLE `chain` DISABLE KEYS */;
INSERT INTO `chain` VALUES (1,'2020-08-16 20:57:25',_binary '\0','Nha Trang','2020-08-16 20:57:25',NULL,0),(2,'2020-08-16 20:57:57',_binary '\0','Da Nang','2020-08-16 20:57:57',NULL,0),(3,'2020-08-16 20:58:04',_binary '\0','Ha Noi','2020-08-16 20:58:04',NULL,0),(4,'2020-08-16 20:58:11',_binary '\0','Phu Quoc','2020-08-16 20:58:11',NULL,0);
/*!40000 ALTER TABLE `chain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rate` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `room_type_id` bigint DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK222yvywq9msspkh8l299p72ps` (`room_type_id`),
  KEY `FKa926jdw9ofp44fheygercoe4n` (`profile_id`),
  CONSTRAINT `FK222yvywq9msspkh8l299p72ps` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKa926jdw9ofp44fheygercoe4n` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (27,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Good',5,NULL,1,'Mr',19);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` bigint NOT NULL,
  `post_code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'2020-09-20 19:06:10',_binary '\0',NULL,'2020-09-20 19:06:10','123',NULL,NULL,'Thuận123 Mạch',932017798,NULL,'chithuan102@gmail.com','213'),(2,'2020-10-07 00:00:00',_binary '\0',NULL,'2020-10-07 00:00:00','123456789',NULL,NULL,'Thuan Mach',930217798,NULL,'chithuan102@gmail.com','this is a messages');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folio_transaction`
--

DROP TABLE IF EXISTS `folio_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folio_transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `transaction_code` varchar(255) DEFAULT NULL,
  `transaction_code_id` bigint NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `reservation_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9b81h6egmpc1a8t2fdnf0eayd` (`reservation_id`),
  CONSTRAINT `FK9b81h6egmpc1a8t2fdnf0eayd` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=342 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folio_transaction`
--

LOCK TABLES `folio_transaction` WRITE;
/*!40000 ALTER TABLE `folio_transaction` DISABLE KEYS */;
INSERT INTO `folio_transaction` VALUES (314,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Paid 10% room charge',-19.9,'Deposit 10% room charge',2,'PAYMENT',1601739627962),(315,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Room charge - Date: 2020-10-03',199,'ROOM_CHARGE',1,'SERVICE',1601739627962),(316,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Room charge - Date: 2020-10-04',199,'ROOM_CHARGE',1,'SERVICE',1601739627962),(317,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Room charge - Date: 2020-10-05',199,'ROOM_CHARGE',1,'SERVICE',1601739627962),(318,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00',NULL,-577.1,'Guest pay cash',12,'PAYMENT',1601739627962),(319,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Paid 10% room charge',-59.7,'Deposit 10% room charge',2,'PAYMENT',1601739836502),(320,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Room charge - Date: 2020-10-03',199,'ROOM_CHARGE',1,'SERVICE',1601739836502),(321,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Room charge - Date: 2020-10-04',199,'ROOM_CHARGE',1,'SERVICE',1601739836502),(322,'2020-10-03 00:00:00',_binary '\0',NULL,'2020-10-03 00:00:00','Room charge - Date: 2020-10-05',199,'ROOM_CHARGE',1,'SERVICE',1601739836502),(323,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Paid 10% room charge',-79.6,'Deposit 10% room charge',2,'PAYMENT',1601816882069),(324,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-04',199,'ROOM_CHARGE',1,'SERVICE',1601816882069),(325,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-05',199,'ROOM_CHARGE',1,'SERVICE',1601816882069),(326,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-06',199,'ROOM_CHARGE',1,'SERVICE',1601816882069),(327,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-07',199,'ROOM_CHARGE',1,'SERVICE',1601816882069),(328,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Paid 10% room charge',-89.7,'Deposit 10% room charge',2,'PAYMENT',1601817028355),(329,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-05',299,'ROOM_CHARGE',1,'SERVICE',1601817028355),(330,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-06',299,'ROOM_CHARGE',1,'SERVICE',1601817028355),(331,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-07',299,'ROOM_CHARGE',1,'SERVICE',1601817028355),(332,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Paid 10% room charge',-29.9,'Deposit 10% room charge',2,'PAYMENT',1601817215444),(333,'2020-10-04 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00','Room charge - Date: 2020-10-04',299,'ROOM_CHARGE',1,'SERVICE',1601817215444),(334,'2020-10-08 00:00:00',_binary '\0',NULL,'2020-10-08 00:00:00','Khách trả tiền',-716.4,'Guest pay cash',12,'PAYMENT',1601816882069),(335,'2020-10-08 00:00:00',_binary '\0',NULL,'2020-10-08 00:00:00',NULL,-269.1,'Guest pay cash',12,'PAYMENT',1601817215444),(336,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00','Paid 10% room charge',-59.7,'Deposit 10% room charge',2,'PAYMENT',1602409185471),(337,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00','Room charge - Date: 2020-10-11',199,'ROOM_CHARGE',1,'SERVICE',1602409185471),(338,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00','Room charge - Date: 2020-10-12',199,'ROOM_CHARGE',1,'SERVICE',1602409185471),(339,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00','Room charge - Date: 2020-10-13',199,'ROOM_CHARGE',1,'SERVICE',1602409185471),(340,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00','Paid 10% room charge',-29.9,'Deposit 10% room charge',2,'PAYMENT',1602409200737),(341,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00','Room charge - Date: 2020-10-11',299,'ROOM_CHARGE',1,'SERVICE',1602409200737);
/*!40000 ALTER TABLE `folio_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `property_id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `chain_id` bigint DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `post_code` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKobabiyjvfufy9lay6kk9lrr7a` (`chain_id`),
  CONSTRAINT `FKobabiyjvfufy9lay6kk9lrr7a` FOREIGN KEY (`chain_id`) REFERENCES `chain` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (11,'2020-08-16 21:27:29',_binary '\0','Nha Trang 1','2020-08-16 21:27:29',0,'123 3 tháng 2',NULL,'123',1,'Information','7000000','11');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL DEFAULT b'0',
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'2020-08-31 00:00:00',_binary '\0','Create role','2020-08-31 00:00:00','CREATE_ROLE'),(2,'2020-08-31 00:00:00',_binary '\0','Delete role','2020-08-31 00:00:00','DELETE_ROLE'),(3,'2020-08-31 00:00:00',_binary '\0','View role','2020-08-31 00:00:00','VIEW_ROLE'),(4,'2020-08-31 00:00:00',_binary '\0','Edit role','2020-08-31 00:00:00','EDIT_ROLE'),(5,'2020-08-31 00:00:00',_binary '\0','View transaction code','2020-08-31 00:00:00','VIEW_TRANSACTION_CODE'),(6,'2020-08-31 00:00:00',_binary '\0','Create transaction code','2020-08-31 00:00:00','CREATE_TRANSACTION_CODE'),(7,'2020-08-31 00:00:00',_binary '\0','View resvation','2020-08-31 00:00:00','VIEW_RESERVATION'),(8,'2020-08-31 00:00:00',_binary '\0','View Billing','2020-08-31 00:00:00','VIEW_BILLING'),(9,'2020-08-31 00:00:00',_binary '\0','View customer','2020-08-31 00:00:00','VIEW_CUSTOMER'),(10,'2020-08-31 00:00:00',_binary '\0','Edit customer','2020-08-31 00:00:00','EDIT_CUSTOMER'),(11,'2020-08-31 00:00:00',_binary '\0','Create customer','2020-08-31 00:00:00','CREATE_CUSTOMER'),(12,'2020-08-31 00:00:00',_binary '\0','View dashboard','2020-08-31 00:00:00','VIEW_DASHBOARD'),(14,'2020-08-31 00:00:00',_binary '\0','View room','2020-08-31 00:00:00','VIEW_ROOM'),(16,'2020-08-31 00:00:00',_binary '\0','View report','2020-08-31 00:00:00','VIEW_REPORT'),(17,'2020-08-31 00:00:00',_binary '\0','View room type','2020-08-31 00:00:00','VIEW_ROOM_TYPE'),(18,'2020-08-31 00:00:00',_binary '\0','View room service','2020-08-31 00:00:00','VIEW_ROOM_SERVICE'),(19,'2020-08-31 00:00:00',_binary '\0','View staff','2020-08-31 00:00:00','VIEW_STAFF'),(20,'2020-08-31 00:00:00',_binary '\0','View statistic dashboard','2020-08-31 00:00:00','VIEW_STATISTIC_DASHBOARD'),(21,'2020-08-31 00:00:00',_binary '\0','Add subguest reservation','2020-08-31 00:00:00','ADD_SUBGUEST_RESERVATION'),(22,'2020-08-31 00:00:00',_binary '\0','View reservation detail','2020-08-31 00:00:00','VIEW_RESERVATION_DETAIL'),(24,'2020-08-31 00:00:00',_binary '\0','Check-out','2020-08-31 00:00:00','CHECK_OUT'),(25,'2020-08-31 00:00:00',_binary '\0','Check-in','2020-08-31 00:00:00','CHECK_IN'),(26,'2020-08-31 00:00:00',_binary '\0','Create billing transaction','2020-08-31 00:00:00','CREATE_BILLING_TRANSACTION'),(28,'2020-08-31 00:00:00',_binary '\0','Create physical room','2020-08-31 00:00:00','CREATE_ROOM'),(30,'2020-08-31 00:00:00',_binary '\0','Change physical room status','2020-08-31 00:00:00','CHANGE_ROOM_STATUS'),(31,'2020-09-27 23:18:45',_binary '\0','Generate report','2020-09-27 23:18:45','RUN_REPORT'),(32,'2020-09-27 23:18:48',_binary '\0','Export report','2020-09-27 23:18:48','EXPORT_REPORT'),(33,'2020-09-27 23:22:33',_binary '\0','Create staff','2020-09-27 23:22:33','CREATE_STAFF'),(34,'2020-09-27 23:22:35',_binary '\0','Delete staff','2020-09-27 23:22:35','DELETE_STAFF');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL DEFAULT b'0',
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `acount_type` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `id_card_type` varchar(255) DEFAULT NULL,
  `id_card_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9d5dpsf2ufa6rjbi3y0elkdcd` (`email`),
  UNIQUE KEY `UK_flvn6l117k7sj0rl3i5woelks` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (19,'2020-10-03 00:00:00',_binary '\0','','2020-10-11 00:00:00','123456789','Thuận Chí','','','930217798','GOOGLE','chithuan102@gmail.com',_binary '','','','Thuan','Mach','','2020-10-07T03:34:46.613Z','Mr','Passport','0932017798'),(27,'2020-10-11 00:00:00',_binary '\0',NULL,'2020-10-11 00:00:00',NULL,'Mach Chi Thuan - FAID HCM',NULL,NULL,'932017798','GOOGLE','thuanmcgcs16103@fpt.edu.vn',_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'2020-10-13 00:00:00',_binary '\0',NULL,'2020-10-13 00:00:00','123',NULL,NULL,NULL,'0932017798',NULL,'test01@gmail.com',_binary '\0',NULL,NULL,'Test','test',NULL,'','Mr',NULL,NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` bigint NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `arrival_date` varchar(255) DEFAULT NULL,
  `departure_date` varchar(255) DEFAULT NULL,
  `main_guest_id` bigint NOT NULL,
  `number_of_adult` int NOT NULL,
  `number_of_children` int NOT NULL,
  `occupancy` int NOT NULL,
  `reservation_status` varchar(255) DEFAULT NULL,
  `room_id` int NOT NULL,
  `amount` bigint NOT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `expiration_date` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `price` bigint NOT NULL,
  `notes` longtext,
  `guest_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `check_in_date` varchar(255) DEFAULT NULL,
  `check_out_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1601739627962,'2020-10-03 22:40:28',_binary '\0',NULL,'2020-10-03 22:43:30','2020-10-03 00:00:00.0','2020-10-05 23:59:59.0',19,2,0,3,'CHECKOUT',1,597,'234','2020-10-03','Paypal',199,NULL,NULL,NULL,NULL,NULL,'2020-10-03','2020-10-03'),(1601739836502,'2020-10-03 22:43:57',_binary '\0',NULL,'2020-10-03 22:45:15','2020-10-03 00:00:00.0','2020-10-05 23:59:59.0',19,2,0,3,'CANCELLED',1,597,'234','2020-10-03','Paypal',199,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1601816882069,'2020-10-04 20:08:02',_binary '\0',NULL,'2020-10-08 09:44:13','2020-10-04 00:00:00.0','2020-10-07 23:59:59.0',19,2,0,3,'CHECKOUT',1,796,'123','2020-10-04','Paypal',199,NULL,NULL,NULL,NULL,NULL,'2020-10-04','2020-10-08'),(1601817028355,'2020-10-04 20:10:28',_binary '\0',NULL,'2020-10-08 09:55:18','2020-10-05 00:00:00.0','2020-10-07 23:59:59.0',19,2,0,3,'CANCELLED',2,897,'123','2020-10-04','Paypal',299,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1601817215444,'2020-10-04 20:13:35',_binary '\0',NULL,'2020-10-08 09:44:29','2020-10-04 00:00:00.0','2020-10-04 23:59:59.0',19,2,0,3,'CHECKOUT',2,299,'123','2020-10-04','Paypal',299,NULL,NULL,NULL,NULL,NULL,'2020-10-04','2020-10-08'),(1602409185471,'2020-10-11 16:39:45',_binary '\0',NULL,'2020-10-11 16:39:45','2020-10-11 00:00:00.0','2020-10-13 23:59:59.0',19,2,0,3,'ARRIVAL',1,597,'123123','2020-10-11','Paypal',199,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1602409200737,'2020-10-11 16:40:01',_binary '\0',NULL,'2020-10-11 17:31:10','2020-10-11 00:00:00.0','2020-10-11 23:59:59.0',19,2,0,3,'INHOUSE',2,299,'123123','2020-10-11','Paypal',299,NULL,NULL,NULL,NULL,NULL,'2020-10-11',NULL);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_guest`
--

DROP TABLE IF EXISTS `reservation_guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_guest` (
  `reservation_id` bigint NOT NULL,
  `guest_id` bigint NOT NULL,
  KEY `FK9vqe7tm7qeml1a2h8ou9he8bo` (`guest_id`),
  KEY `FKkqygr0knkixmuu9huwbxhvg23` (`reservation_id`),
  CONSTRAINT `FK9vqe7tm7qeml1a2h8ou9he8bo` FOREIGN KEY (`guest_id`) REFERENCES `profile` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKkqygr0knkixmuu9huwbxhvg23` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_guest`
--

LOCK TABLES `reservation_guest` WRITE;
/*!40000 ALTER TABLE `reservation_guest` DISABLE KEYS */;
INSERT INTO `reservation_guest` VALUES (1602409200737,27);
/*!40000 ALTER TABLE `reservation_guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,NULL,_binary '\0','ADMIN','2020-09-02 18:45:33'),(7,'2020-10-07 00:00:00',_binary '\0','Manager','2020-10-07 00:00:00');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` bigint NOT NULL,
  `permission_id` bigint NOT NULL,
  KEY `FKf8yllw1ecvwqy3ehyxawqa1qp` (`permission_id`),
  KEY `FKa6jx8n8xkesmjmv6jqug6bg68` (`role_id`),
  CONSTRAINT `FKa6jx8n8xkesmjmv6jqug6bg68` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKf8yllw1ecvwqy3ehyxawqa1qp` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(7,12);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `room_code` varchar(255) DEFAULT NULL,
  `room_status` varchar(255) DEFAULT NULL,
  `room_type_id` bigint DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `room_code_UNIQUE` (`room_code`),
  KEY `FKd468eq7j1cbue8mk20qfrj5et` (`room_type_id`),
  KEY `FKdosq3ww4h9m2osim6o0lugng8` (`hotel_id`),
  CONSTRAINT `FKd468eq7j1cbue8mk20qfrj5et` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`),
  CONSTRAINT `FKdosq3ww4h9m2osim6o0lugng8` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'2020-08-20 00:00:00',0,'','2020-10-08 00:00:00','R001','AVAILABLE',1,NULL),(2,'2020-08-20 00:00:00',0,'','2020-10-11 00:00:00','R002','BOOKED',2,NULL),(3,'2020-08-20 22:42:38',0,'','2020-09-27 15:43:27','R003','AVAILABLE',3,NULL),(4,'2020-08-20 22:43:02',0,'','2020-10-01 00:14:33','R004','AVAILABLE',4,NULL),(5,'2020-08-20 22:54:02',0,'','2020-09-29 10:00:59','R005','AVAILABLE',5,NULL),(6,'2020-08-23 23:08:50',0,'','2020-09-27 17:27:10','R006','AVAILABLE',5,NULL),(9,'2020-10-13 00:00:00',0,NULL,'2020-10-13 00:00:00','R007','AVAILABLE',1,NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_service`
--

DROP TABLE IF EXISTS `room_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_service`
--

LOCK TABLES `room_service` WRITE;
/*!40000 ALTER TABLE `room_service` DISABLE KEYS */;
INSERT INTO `room_service` VALUES (3,NULL,_binary '\0','Ordering through phone','2020-09-29 08:40:42'),(4,NULL,_binary '\0','Door knob card','2020-09-29 08:40:40'),(5,'2020-08-25 21:34:34',_binary '\0','Mini bar','2020-09-23 11:59:02'),(6,NULL,_binary '\0','Breakfast','2020-09-07 10:15:12'),(7,'2020-08-25 22:12:14',_binary '\0','Bồn tắm và vòi sen riêng biệt','2020-08-25 22:12:14'),(8,'2020-08-25 22:12:25',_binary '\0','Máy pha cafe','2020-08-25 22:12:25'),(9,'2020-08-25 22:12:40',_binary '\0','Máy sấy tóc','2020-08-25 22:12:40'),(10,'2020-08-25 22:12:47',_binary '\0','Hot Shower','2020-08-25 22:12:47');
/*!40000 ALTER TABLE `room_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_type`
--

DROP TABLE IF EXISTS `room_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `max_occupancy` int NOT NULL,
  `price` bigint NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `area` int NOT NULL,
  `bed` int NOT NULL,
  `total_booked` int NOT NULL,
  `banner` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_type`
--

LOCK TABLES `room_type` WRITE;
/*!40000 ALTER TABLE `room_type` DISABLE KEYS */;
INSERT INTO `room_type` VALUES (1,NULL,_binary '\0','Delux Room','2020-10-11 00:00:00','ABCasd',3,199,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/386uiejsxaz?alt=media&token=73661f13-ab22-47ab-aca6-f091aae23b0d',60,2,1,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/e29h5hrlz3?alt=media&token=d2c0b161-ee31-4fba-9aa3-ca688ca83ece'),(2,NULL,_binary '\0','King Room','2020-10-11 00:00:00','description',3,299,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/jz8xcmjky1q?alt=media&token=e441971c-0501-422e-9d01-339b8ec6b1c7',0,0,1,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/phv8otlh3id?alt=media&token=e0a8cb01-edb7-46c6-a1d7-5e65c62f01cd'),(3,NULL,_binary '\0','Queen Room','2020-10-07 00:00:00','description',3,299,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/srm3iztd40j?alt=media&token=8c922198-bfc6-46d9-a8d2-cf8dd7de2068',0,0,0,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/z57t11gmzj?alt=media&token=fe9fdd42-b649-4329-9046-110c63b60f99'),(4,NULL,_binary '\0','Luxury Room','2020-10-07 00:00:00','description',3,399,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/5kyxs7cihco?alt=media&token=497b93ad-d3c1-4963-8868-6780344135a1',0,0,0,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/kctaob3da4f?alt=media&token=5ceac6fe-46bc-460c-8cfd-f893ee6bb80b'),(5,NULL,_binary '\0','Single Room','2020-10-07 00:00:00','description',3,99,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/gsda9z6czpd?alt=media&token=9faa642e-7012-4134-b6ff-cf19001c3664',0,0,0,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/z3hjmoah0f?alt=media&token=abf94369-906e-470c-aa9c-599303b0758a'),(6,NULL,_binary '\0','Double Room','2020-10-07 00:00:00','description',3,159,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/29xeykh7bgy?alt=media&token=256004c6-37a6-40f6-aef1-649aa6338dd2',0,0,0,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/09ga64ph35t?alt=media&token=d225218f-6f39-4278-8a21-5add4546ed68'),(7,NULL,_binary '\0','Test Room','2020-10-07 00:00:00','123',2,2,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/22zd4ror0t3?alt=media&token=a38f96f0-a14a-4435-821e-7eaaad710f03',2,2,0,'https://firebasestorage.googleapis.com/v0/b/mctproject-bcdad.appspot.com/o/qatuf8jxxha?alt=media&token=0440e8cd-1ce0-4e77-8981-034b902662d5');
/*!40000 ALTER TABLE `room_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_type_room_service`
--

DROP TABLE IF EXISTS `room_type_room_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_type_room_service` (
  `room_type_id` bigint NOT NULL,
  `room_service_id` bigint NOT NULL,
  KEY `FKf0vm5fs47fll53cxiic65ge3w` (`room_type_id`,`room_service_id`),
  KEY `FK8lbdr7n96bqd5ux6j6p0ocg0r` (`room_service_id`),
  CONSTRAINT `FK8lbdr7n96bqd5ux6j6p0ocg0r` FOREIGN KEY (`room_service_id`) REFERENCES `room_service` (`id`),
  CONSTRAINT `FKf0vm5fs47fll53cxiic65ge3w` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_type_room_service`
--

LOCK TABLES `room_type_room_service` WRITE;
/*!40000 ALTER TABLE `room_type_room_service` DISABLE KEYS */;
INSERT INTO `room_type_room_service` VALUES (5,4),(5,5),(5,6);
/*!40000 ALTER TABLE `room_type_room_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_code`
--

DROP TABLE IF EXISTS `transaction_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_code` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_code`
--

LOCK TABLES `transaction_code` WRITE;
/*!40000 ALTER TABLE `transaction_code` DISABLE KEYS */;
INSERT INTO `transaction_code` VALUES (1,'2020-09-02 19:21:27',_binary '\0','ROOM_CHARGE','2020-09-02 19:21:27','SERVICE','Room charge'),(2,'2020-09-02 19:21:43',_binary '\0','DEPOSIT_10%_ROOM_CHARGE','2020-09-02 19:21:43','PAYMENT','Deposit 10% room charge'),(3,'2020-09-20 22:57:43',_binary '\0','ROOM_SERVICE','2020-09-20 22:57:43','SERVICE','Room Service'),(11,'2020-09-02 22:01:45',_binary '\0','BREAKFAST','2020-09-02 22:01:45','SERVICE','Break fast'),(12,'2020-09-02 22:31:02',_binary '\0','GUEST_CASH','2020-09-02 22:31:02','PAYMENT','Guest pay cash');
/*!40000 ALTER TABLE `transaction_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'2020-09-27 00:00:00',_binary '\0',NULL,'2020-10-04 00:00:00',NULL,NULL,NULL,1,'123','admin'),(13,'2020-10-07 00:00:00',_binary '\0','','2020-10-07 00:00:00','','','',7,'staff01','staff01');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-13  8:45:49
