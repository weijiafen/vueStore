/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : vuestore

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-05 09:54:39
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
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('5', '优惠', '1', null, null);
INSERT INTO `category` VALUES ('6', '双人套餐', '1', null, null);
INSERT INTO `category` VALUES ('7', '主餐+饮料套餐', '1', null, null);
INSERT INTO `category` VALUES ('8', '米粉米线', '1', null, null);
INSERT INTO `category` VALUES ('9', '主食套餐', '1', null, null);

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
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of good
-- ----------------------------
INSERT INTO `good` VALUES ('17', '双拼饭汤套餐配脆笋蒸蛋', '排骨拼鸡腿肉饭*1四季猪骨汤*1肉燥脆笋*1香滑蒸蛋*1', '12', '5', '26.25', '1', null, null, '/file/7616603086032818.jpg');
INSERT INTO `good` VALUES ('18', '栗子鸡新品满足餐', '栗子焖土鸡饭*1四季猪骨汤*1蒸饺*1', '2', '5', '37.13', '1', null, null, '/file/4028130857117650.jpg');
INSERT INTO `good` VALUES ('19', '超值双人餐', '香汁排骨饭*1香菇鸡腿饭*1咖喱鱼丸*1元气竹丝鸡汤*1四季猪骨汤*1香滑蒸蛋*1', '0', '5', '54', '1', null, null, '/file/9054985509261786.jpg');
INSERT INTO `good` VALUES ('20', '超值双人餐', '香汁排骨饭*1香菇鸡腿饭*1咖喱鱼丸*1元气竹丝鸡汤*1四季猪骨汤*1香滑蒸蛋*1', '0', '6', '54', '1', null, null, '/file/1334921747542689.jpg');
INSERT INTO `good` VALUES ('21', '鱼香茄子饭', '', '0', '7', '27', '1', null, null, '/file/7231204966550076.jpg');
INSERT INTO `good` VALUES ('22', '瘦肉粉（小）', '瘦肉粉（小）*1', '0', '8', '9.5', '1', null, null, '/file/6698605017574994.jpg');
INSERT INTO `good` VALUES ('23', '五香牛腩粉', '五香牛腩粉*1', '0', '8', '19', '1', null, null, '/file/3976726804314719.jpg');

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
  PRIMARY KEY (`id`),
  KEY `goodId` (`goodId`),
  CONSTRAINT `goodId` FOREIGN KEY (`goodId`) REFERENCES `good` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('4', '加米饭', '#F4F8C5', null, null, '17');
INSERT INTO `label` VALUES ('5', '加辣椒', '#E70C0C', null, null, '17');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'weijiafen', '055d0ea123c9748b52804baef625e8e2', '真功夫', '1508311094675', null, null, '欢迎光临真功夫', '0', '/file/8705401371272582.jpg');
