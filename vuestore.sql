/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : vuestore

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-10 20:56:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('17', '香蕉你个巴拉', '1', null, null);

-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createAt` bigint(255) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('123', 'test', null, null);

-- ----------------------------
-- Table structure for `desk`
-- ----------------------------
DROP TABLE IF EXISTS `desk`;
CREATE TABLE `desk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createAt` bigint(255) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `duserId` (`userId`) USING BTREE,
  CONSTRAINT `duserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of desk
-- ----------------------------
INSERT INTO `desk` VALUES ('1', '1号桌', '1', null, null);

-- ----------------------------
-- Table structure for `good`
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `count` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` float NOT NULL,
  `isOnline` int(11) NOT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `categoryId` (`categoryId`) USING BTREE,
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of good
-- ----------------------------
INSERT INTO `good` VALUES ('24', '香蕉', '香蕉你个巴拉中的香蕉', '97', '17', '12', '1', null, null, null);
INSERT INTO `good` VALUES ('25', '巴拉', '香蕉你个巴拉中的巴拉', '107', '17', '20', '1', null, null, null);

-- ----------------------------
-- Table structure for `label`
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `bgColor` varchar(255) NOT NULL DEFAULT '#fff',
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `goodId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `goodId` (`goodId`) USING BTREE,
  CONSTRAINT `goodId` FOREIGN KEY (`goodId`) REFERENCES `good` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('6', '加辣', '#E11010', null, null, '24');
INSERT INTO `label` VALUES ('7', '烤的', '#FF460E', null, null, '24');

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `count` varchar(255) DEFAULT NULL,
  `isPay` int(255) DEFAULT NULL,
  `status` int(255) DEFAULT NULL,
  `createAt` bigint(255) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `deskId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `customerId` (`customerId`) USING BTREE,
  KEY `deskId` (`deskId`) USING BTREE,
  KEY `ouid` (`userId`),
  CONSTRAINT `customerId` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deskId` FOREIGN KEY (`deskId`) REFERENCES `desk` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ouid` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('110', '44', '1', '3', '1515500220544', null, '123', '1', '1');
INSERT INTO `order` VALUES ('111', '44', '1', '5', '1515500424071', null, '123', '1', '1');
INSERT INTO `order` VALUES ('112', '12', '1', '5', '1515501127359', null, '123', '1', '1');
INSERT INTO `order` VALUES ('113', '12', '1', '5', '1515501142922', null, '123', '1', '1');
INSERT INTO `order` VALUES ('114', '32', '1', '5', '1515501193051', null, '123', '1', '1');
INSERT INTO `order` VALUES ('115', '20', '1', '5', '1515501262149', null, '123', '1', '1');
INSERT INTO `order` VALUES ('116', '12', '1', '5', '1515501274320', null, '123', '1', '1');
INSERT INTO `order` VALUES ('117', '32', '1', '5', '1515501449316', null, '123', '1', '1');
INSERT INTO `order` VALUES ('118', '60', '1', '5', '1515501539225', null, '123', '1', '1');
INSERT INTO `order` VALUES ('119', '80', '1', '5', '1515501643807', null, '123', '1', '1');
INSERT INTO `order` VALUES ('120', '20', '1', '5', '1515550005281', null, '123', '1', '1');
INSERT INTO `order` VALUES ('121', '20', '1', '5', '1515550040121', null, '123', '1', '1');
INSERT INTO `order` VALUES ('122', '20', '1', '5', '1515565744249', null, '123', '1', '1');
INSERT INTO `order` VALUES ('123', '20', '1', '5', '1515566113954', null, '123', '1', '1');
INSERT INTO `order` VALUES ('124', '20', '1', '5', '1515566517537', null, '123', '1', '1');
INSERT INTO `order` VALUES ('125', '12', '1', '5', '1515588564738', null, '123', '1', '1');

-- ----------------------------
-- Table structure for `suborder`
-- ----------------------------
DROP TABLE IF EXISTS `suborder`;
CREATE TABLE `suborder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` float DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `goodId` int(11) DEFAULT NULL,
  `labels` varchar(255) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `orderId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `orderId` (`orderId`) USING BTREE,
  KEY `SgoodId` (`goodId`) USING BTREE,
  CONSTRAINT `SgoodId` FOREIGN KEY (`goodId`) REFERENCES `good` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `orderId` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of suborder
-- ----------------------------
INSERT INTO `suborder` VALUES ('156', '24', '2', '24', '7,6', '1515501193051', null, '110');
INSERT INTO `suborder` VALUES ('157', '20', '1', '25', '', '1515501193051', null, '110');
INSERT INTO `suborder` VALUES ('158', '24', '2', '24', '7,6', '1515501193051', null, '111');
INSERT INTO `suborder` VALUES ('159', '20', '1', '25', '', '1515501643807', null, '111');
INSERT INTO `suborder` VALUES ('160', '12', '1', '24', '', '1515501643807', null, '112');
INSERT INTO `suborder` VALUES ('161', '12', '1', '24', '', '1515501643807', null, '113');
INSERT INTO `suborder` VALUES ('162', '12', '1', '24', '7', '1515501643807', null, '114');
INSERT INTO `suborder` VALUES ('163', '20', '1', '25', '', '1515566113954', null, '114');
INSERT INTO `suborder` VALUES ('164', '20', '1', '25', '', '1515566113954', null, '115');
INSERT INTO `suborder` VALUES ('165', '12', '1', '24', '', '1515566113954', null, '116');
INSERT INTO `suborder` VALUES ('166', '12', '1', '24', '7', '1515501539225', null, '117');
INSERT INTO `suborder` VALUES ('167', '20', '1', '25', '', '1515501539225', null, '117');
INSERT INTO `suborder` VALUES ('168', '60', '3', '25', '', '1515501539225', null, '118');
INSERT INTO `suborder` VALUES ('169', '80', '4', '25', '', '1515501539225', null, '119');
INSERT INTO `suborder` VALUES ('170', '20', '1', '25', '', '1515501127359', null, '120');
INSERT INTO `suborder` VALUES ('171', '20', '1', '25', '', '1515501127359', null, '121');
INSERT INTO `suborder` VALUES ('172', '20', '1', '25', '', '1515501127359', null, '122');
INSERT INTO `suborder` VALUES ('173', '20', '1', '25', '', '1515500424071', null, '123');
INSERT INTO `suborder` VALUES ('174', '20', '1', '25', '', '1515500424071', null, '124');
INSERT INTO `suborder` VALUES ('175', '20', '1', '25', null, '1517414499111', null, '123');
INSERT INTO `suborder` VALUES ('176', '12', '1', '24', '7', '1515588564768', null, '125');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `lastLoginAt` bigint(20) DEFAULT NULL,
  `createAt` bigint(20) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `notice` varchar(255) DEFAULT NULL,
  `openBusiness` int(11) NOT NULL DEFAULT '0',
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'weijiafen', '055d0ea123c9748b52804baef625e8e2', '真功夫', '1508311094675', null, null, '欢迎光临真功夫', '0', '/file/8705401371272582.jpg');
