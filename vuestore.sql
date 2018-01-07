/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : vuestore

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 07/01/2018 20:17:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `createAt` bigint(20) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (17, '香蕉你个巴拉', 1, NULL, NULL);

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createAt` bigint(255) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 124 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (123, 'test', NULL, NULL);

-- ----------------------------
-- Table structure for desk
-- ----------------------------
DROP TABLE IF EXISTS `desk`;
CREATE TABLE `desk`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `createAt` bigint(255) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `duserId`(`userId`) USING BTREE,
  CONSTRAINT `duserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of desk
-- ----------------------------
INSERT INTO `desk` VALUES (1, '1号桌', 1, NULL, NULL);

-- ----------------------------
-- Table structure for good
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `count` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` float NOT NULL,
  `isOnline` int(11) NOT NULL,
  `createAt` bigint(20) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `categoryId`(`categoryId`) USING BTREE,
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good
-- ----------------------------
INSERT INTO `good` VALUES (24, '香蕉', '香蕉你个巴拉中的香蕉', 0, 17, 12, 1, NULL, NULL, NULL);
INSERT INTO `good` VALUES (25, '巴拉', '香蕉你个巴拉中的巴拉', 18, 17, 20, 1, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `bgColor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '#fff',
  `createAt` bigint(20) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  `goodId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `goodId`(`goodId`) USING BTREE,
  CONSTRAINT `goodId` FOREIGN KEY (`goodId`) REFERENCES `good` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (6, '加辣', '#E11010', NULL, NULL, 24);
INSERT INTO `label` VALUES (7, '烤的', '#FF460E', NULL, NULL, 24);

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `count` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isPay` int(255) NULL DEFAULT NULL,
  `status` int(255) NULL DEFAULT NULL,
  `createAt` bigint(255) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  `customerId` int(11) NULL DEFAULT NULL,
  `deskId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `customerId`(`customerId`) USING BTREE,
  INDEX `deskId`(`deskId`) USING BTREE,
  CONSTRAINT `customerId` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deskId` FOREIGN KEY (`deskId`) REFERENCES `desk` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (94, '12', 0, 1, 1515252927665, NULL, 123, 1);
INSERT INTO `order` VALUES (95, '12', 0, 1, 1515291319207, NULL, 123, 1);
INSERT INTO `order` VALUES (96, '12', 0, 2, 1515291530894, NULL, 123, 1);
INSERT INTO `order` VALUES (97, '12', 0, 1, 1515291621719, NULL, 123, 1);
INSERT INTO `order` VALUES (98, '12', 0, 3, 1515292108267, NULL, 123, 1);
INSERT INTO `order` VALUES (99, '36', 0, 4, 1515295609226, NULL, 123, 1);
INSERT INTO `order` VALUES (100, '44', 0, 1, 1515296455405, NULL, 123, 1);
INSERT INTO `order` VALUES (101, '12', 0, 1, 1515298258319, NULL, 123, 1);
INSERT INTO `order` VALUES (102, '12', 0, 1, 1515305464290, NULL, 123, 1);
INSERT INTO `order` VALUES (103, '20', 0, 1, 1515305858704, NULL, 123, 1);

-- ----------------------------
-- Table structure for suborder
-- ----------------------------
DROP TABLE IF EXISTS `suborder`;
CREATE TABLE `suborder`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` float NULL DEFAULT NULL,
  `number` int(11) NULL DEFAULT NULL,
  `goodId` int(11) NULL DEFAULT NULL,
  `labels` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createAt` bigint(20) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  `orderId` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `orderId`(`orderId`) USING BTREE,
  INDEX `SgoodId`(`goodId`) USING BTREE,
  CONSTRAINT `orderId` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SgoodId` FOREIGN KEY (`goodId`) REFERENCES `good` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 148 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of suborder
-- ----------------------------
INSERT INTO `suborder` VALUES (135, 12, 1, 24, '', NULL, NULL, 94);
INSERT INTO `suborder` VALUES (136, 12, 1, 24, '', NULL, NULL, 95);
INSERT INTO `suborder` VALUES (137, 12, 1, 24, '', NULL, NULL, 96);
INSERT INTO `suborder` VALUES (138, 12, 1, 24, '', NULL, NULL, 97);
INSERT INTO `suborder` VALUES (139, 12, 1, 24, '7,6', NULL, NULL, 98);
INSERT INTO `suborder` VALUES (140, 12, 1, 24, '7', NULL, NULL, 99);
INSERT INTO `suborder` VALUES (141, 24, 2, 24, '6', NULL, NULL, 99);
INSERT INTO `suborder` VALUES (142, 12, 1, 24, '7', NULL, NULL, 100);
INSERT INTO `suborder` VALUES (143, 12, 1, 24, '6', NULL, NULL, 100);
INSERT INTO `suborder` VALUES (144, 20, 1, 25, '', NULL, NULL, 100);
INSERT INTO `suborder` VALUES (145, 12, 1, 24, '', NULL, NULL, 101);
INSERT INTO `suborder` VALUES (146, 12, 1, 24, '', NULL, NULL, 102);
INSERT INTO `suborder` VALUES (147, 20, 1, 25, '', NULL, NULL, 103);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lastLoginAt` bigint(20) NULL DEFAULT NULL,
  `createAt` bigint(20) NULL DEFAULT NULL,
  `updateAt` bigint(20) NULL DEFAULT NULL,
  `notice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `openBusiness` int(11) NOT NULL DEFAULT 0,
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'weijiafen', '055d0ea123c9748b52804baef625e8e2', '真功夫', 1508311094675, NULL, NULL, '欢迎光临真功夫', 0, '/file/8705401371272582.jpg');

SET FOREIGN_KEY_CHECKS = 1;
