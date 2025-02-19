-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: rigging
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('c90a986ddce9');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `component` (
  `id` int NOT NULL AUTO_INCREMENT,
  `component_type_id` int NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `dom` date NOT NULL,
  `size_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `model_id` int DEFAULT NULL,
  `jumps` int NOT NULL,
  `aad_jumps_on_mount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `component_type_id` (`component_type_id`),
  KEY `size_id` (`size_id`),
  KEY `status_id` (`status_id`),
  KEY `model_id` (`model_id`),
  CONSTRAINT `component_ibfk_1` FOREIGN KEY (`component_type_id`) REFERENCES `component_type` (`id`),
  CONSTRAINT `component_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`),
  CONSTRAINT `component_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `component_ibfk_5` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component`
--

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
INSERT INTO `component` VALUES (5,2,'con-001','2024-02-15',12,1,5,1479,0),(9,3,'res-001','2024-01-31',NULL,1,8,0,0),(13,5,'aad-01','2024-02-02',NULL,3,1,20,20),(22,1,'can-003','2024-03-06',NULL,1,1,102,0),(26,1,'can-002','2024-02-27',NULL,1,1,0,0),(27,1,'can-004','2024-03-12',NULL,1,1,0,0),(28,2,'con-002','2024-02-27',12,1,5,0,0),(29,2,'con-003','2024-03-11',NULL,1,5,0,0),(30,2,'con-004','2024-02-29',NULL,1,5,0,0),(31,3,'res-002','2024-03-11',NULL,1,8,0,0),(32,3,'res-003','2024-03-19',NULL,1,8,0,0),(33,3,'res-004','2024-03-03',NULL,1,8,0,0),(34,5,'aad-002','2024-03-07',NULL,1,9,0,0),(36,5,'aad-004','2024-03-06',NULL,1,9,0,0),(39,5,'aad-003','2024-02-27',NULL,1,9,0,0),(40,1,'can-001','2024-03-20',NULL,1,2,1407,0),(41,1,'can-05','2024-04-17',15,1,8,0,0),(43,1,'can-06','2024-04-02',3,1,1,12,0),(44,1,'can-07','2024-04-07',4,1,1,0,0),(51,2,'cont-005','2024-04-02',7,1,5,0,0),(52,3,'res-005','2024-05-24',8,1,8,0,0),(53,5,'aad-005','2024-05-01',3,1,9,0,0);
/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `component_type`
--

DROP TABLE IF EXISTS `component_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `component_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `component_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component_type`
--

LOCK TABLES `component_type` WRITE;
/*!40000 ALTER TABLE `component_type` DISABLE KEYS */;
INSERT INTO `component_type` VALUES (1,'Canopy'),(2,'Container'),(3,'Reserve'),(5,'Aad'),(6,'Rig');
/*!40000 ALTER TABLE `component_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `manufacturer` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (1,'PD'),(4,'Icarus'),(5,'UPT'),(9,'APS'),(12,'Mirage');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `manufacturer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `manufacturer_id` (`manufacturer_id`),
  CONSTRAINT `model_ibfk_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (1,'Sabre2',1),(2,'Navigator',1),(5,'Alavon',9),(8,'PDR',1),(9,'Cypres Cmode',1);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rig`
--

DROP TABLE IF EXISTS `rig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rig` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rig_number` varchar(10) NOT NULL,
  `current_aad_jumps` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rig`
--

LOCK TABLES `rig` WRITE;
/*!40000 ALTER TABLE `rig` DISABLE KEYS */;
INSERT INTO `rig` VALUES (8,'rig-001',0),(13,'rig-002',0),(15,'rig-003',0),(18,'rig-005',0);
/*!40000 ALTER TABLE `rig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rig_component_association`
--

DROP TABLE IF EXISTS `rig_component_association`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rig_component_association` (
  `rig_id` int NOT NULL,
  `component_id` int NOT NULL,
  PRIMARY KEY (`rig_id`,`component_id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `rig_component_association_ibfk_1` FOREIGN KEY (`component_id`) REFERENCES `component` (`id`),
  CONSTRAINT `rig_component_association_ibfk_2` FOREIGN KEY (`rig_id`) REFERENCES `rig` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rig_component_association`
--

LOCK TABLES `rig_component_association` WRITE;
/*!40000 ALTER TABLE `rig_component_association` DISABLE KEYS */;
INSERT INTO `rig_component_association` VALUES (8,5),(8,9),(8,13),(13,26),(13,28),(15,29),(13,31),(15,32),(13,34),(15,39),(8,40),(18,41),(18,51),(18,52);
/*!40000 ALTER TABLE `rig_component_association` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rigging`
--

DROP TABLE IF EXISTS `rigging`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rigging` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `serial_numbers` varchar(255) NOT NULL,
  `rig_id` int DEFAULT NULL,
  `component_id` int DEFAULT NULL,
  `description` text,
  `rigger_id` int DEFAULT NULL,
  `type_rigging_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `component_id` (`component_id`),
  KEY `rig_id` (`rig_id`),
  KEY `rigger_id` (`rigger_id`),
  KEY `type_rigging_id` (`type_rigging_id`),
  CONSTRAINT `rigging_ibfk_1` FOREIGN KEY (`component_id`) REFERENCES `component` (`id`),
  CONSTRAINT `rigging_ibfk_2` FOREIGN KEY (`rig_id`) REFERENCES `rig` (`id`),
  CONSTRAINT `rigging_ibfk_3` FOREIGN KEY (`rigger_id`) REFERENCES `user` (`id`),
  CONSTRAINT `rigging_ibfk_4` FOREIGN KEY (`type_rigging_id`) REFERENCES `rigging_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rigging`
--

LOCK TABLES `rigging` WRITE;
/*!40000 ALTER TABLE `rigging` DISABLE KEYS */;
INSERT INTO `rigging` VALUES (6,'2024-03-13','con-004',NULL,30,NULL,12,1),(7,'2024-03-28','con-001',NULL,5,'Noneñ<lsdkncklñ<ds',12,2),(10,'2024-04-10','con-001',NULL,5,'111',12,2),(14,'2024-05-21','con-001',NULL,5,'',12,2),(15,'2024-04-17','can-002',NULL,26,'oooooooooooooooooo',12,1),(16,'2024-05-21','rig-001',NULL,NULL,'Descripcion de hoy',12,1),(21,'2024-05-12','con-003',NULL,29,'ĺkasdjnv',12,2),(24,'2024-05-01','can-003',NULL,22,'aaaaaaaaaaaaaaaaa',12,2),(27,'2024-05-15','can-003',NULL,22,'11111111',12,1),(28,'2024-05-16','can-003',NULL,22,'2222222222222',12,2),(30,'2024-05-16','can-003',NULL,22,'3333333333333333333333333333',12,2),(31,'2024-05-16','aad-002',NULL,34,'first añt',12,3),(32,'2024-05-17','can-003',NULL,22,'444444444',12,2),(33,'2024-05-31','can-003',NULL,22,'5555555',12,2),(34,'2024-05-17','rig-001',8,NULL,'Plegado de reserva',12,1),(35,'2024-06-01','rig-002',13,NULL,'Plegado de reserva',12,1),(36,'2024-05-17','',8,NULL,'reserve repack',12,1),(38,'2024-05-17','can-07',NULL,44,'Patch',12,2),(39,'2024-05-17','',8,NULL,'1111111111111',12,1),(40,'2024-05-17','cont-005',NULL,51,'asdva',12,2),(41,'2024-05-17','cont-005',NULL,51,'sssssssssssssssss',12,2),(42,'2024-05-17','',15,NULL,'Plegado de reserva',12,1),(43,'2024-05-17','rig-002',13,NULL,'21211121212',12,1),(45,'2024-05-29','',18,NULL,'Plegado de reserva',12,1);
/*!40000 ALTER TABLE `rigging` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rigging_type`
--

DROP TABLE IF EXISTS `rigging_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rigging_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rigging_type`
--

LOCK TABLES `rigging_type` WRITE;
/*!40000 ALTER TABLE `rigging_type` DISABLE KEYS */;
INSERT INTO `rigging_type` VALUES (1,'I+R',NULL),(2,'Reparation',NULL),(3,'Alteration',NULL),(4,'Fabrication',NULL);
/*!40000 ALTER TABLE `rigging_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (4,'admin'),(6,'rigger'),(1,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (3,'170'),(4,'180'),(5,'190'),(6,'200'),(7,'210'),(8,'218'),(9,'220'),(10,'240'),(12,'V124'),(13,'V234'),(14,'V235'),(15,'250'),(18,'150'),(19,'160');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Operational'),(3,'Out Of Service'),(4,'Project');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','verticalwind@gmail.com','admin'),(12,'nasko','ahturlakov@gmail.com','scrypt:32768:8:1$vfu32ITz4NkRl8xy$8642e4fb38c233d16bdb62bb892a8b5c6450ac36ac358eb736398c1e1a1041ddec858dc659e0e42a9bc0750ca53ccbed15ac5bbeb9a92220e689aa129f9f89ef'),(14,'user1','user111@gmail.com','scrypt:32768:8:1$QHmfrS7ddgopNDzM$d3e88828a1dc7e416bace403f417310b5e681f4bbde4331f4e9ed18ede8ebafbe4264fd54b805f6739819f6666a86090d3eedab4a2e80d5652e33b8d9b616f12');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (14,1),(1,4),(12,4),(12,6);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 16:21:26
