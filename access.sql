/*
Navicat MySQL Data Transfer

Source Server         : cneasypasy
Source Server Version : 50725
Source Host           : 134.175.45.63:3306
Source Database       : access

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-17 20:25:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_account
-- ----------------------------
DROP TABLE IF EXISTS `tbl_account`;
CREATE TABLE `tbl_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `login_name` varchar(64) NOT NULL COMMENT '登陆账号',
  `password` varchar(64) NOT NULL COMMENT '登陆密码',
  `user_id` int(11) NOT NULL COMMENT '用户信息ID',
  `role_id` int(11) NOT NULL COMMENT '用户角色ID',
  `create_time` datetime NOT NULL COMMENT '创建用户时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `tbl_account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`),
  CONSTRAINT `tbl_account_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `tbl_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='登陆账号表';

-- ----------------------------
-- Records of tbl_account
-- ----------------------------
INSERT INTO `tbl_account` VALUES ('29', 'admin', '666666', '1', '1', '2019-03-19 11:50:15');
INSERT INTO `tbl_account` VALUES ('30', 'duanzhou', '666666', '31', '2', '2019-03-19 11:52:50');
INSERT INTO `tbl_account` VALUES ('31', 'tianhe', '666666', '32', '2', '2019-03-19 11:53:34');
INSERT INTO `tbl_account` VALUES ('32', 'hy', '666666', '33', '3', '2019-03-19 12:40:21');
INSERT INTO `tbl_account` VALUES ('33', 'hlb', '666666', '34', '3', '2019-03-19 12:40:39');
INSERT INTO `tbl_account` VALUES ('34', 'mjc', '666666', '35', '3', '2019-03-19 12:41:04');
INSERT INTO `tbl_account` VALUES ('35', '20190319125602', 'osFgc5DHuifJ9fmZ-SN1u8oZKe9w', '36', '4', '2019-03-19 12:56:02');
INSERT INTO `tbl_account` VALUES ('36', '20190319130132', 'osFgc5GcEXyfPmu2Zrc6UOFCqJJc', '37', '4', '2019-03-19 13:01:32');
INSERT INTO `tbl_account` VALUES ('37', '20190324135114', 'osFgc5LvDRaQobYrv5unoTSkmTZg', '38', '4', '2019-03-24 13:51:14');
INSERT INTO `tbl_account` VALUES ('40', 'yf', '666666', '41', '3', '2019-04-17 19:05:05');

-- ----------------------------
-- Table structure for tbl_area
-- ----------------------------
DROP TABLE IF EXISTS `tbl_area`;
CREATE TABLE `tbl_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `area_code` int(11) NOT NULL COMMENT '统一行政编码',
  `prov` varchar(32) NOT NULL COMMENT '省',
  `city` varchar(32) NOT NULL COMMENT '市',
  `dist` varchar(32) NOT NULL COMMENT '区',
  `create_time` varchar(32) NOT NULL COMMENT '创建区域时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='区域表';

-- ----------------------------
-- Records of tbl_area
-- ----------------------------
INSERT INTO `tbl_area` VALUES ('-1', '-1', '全局', '全局', '全局', '');
INSERT INTO `tbl_area` VALUES ('5', '441202', '广东省', '肇庆市', '端州区', '2019-03-19 11:51:41');
INSERT INTO `tbl_area` VALUES ('6', '440305', '广东省', '深圳市', '南山区', '2019-03-19 11:52:00');
INSERT INTO `tbl_area` VALUES ('7', '440106', '广东省', '广州市', '天河区', '2019-03-19 11:52:12');

-- ----------------------------
-- Table structure for tbl_area_admin
-- ----------------------------
DROP TABLE IF EXISTS `tbl_area_admin`;
CREATE TABLE `tbl_area_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `account_id` int(11) NOT NULL COMMENT '账号ID',
  `area_id` int(11) NOT NULL COMMENT '区域ID',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `tbl_area_admin_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `tbl_area_admin_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `tbl_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='区域管理员表';

-- ----------------------------
-- Records of tbl_area_admin
-- ----------------------------
INSERT INTO `tbl_area_admin` VALUES ('5', '30', '5', '0', '2019-03-19 11:52:50');
INSERT INTO `tbl_area_admin` VALUES ('6', '31', '7', '0', '2019-03-19 11:53:34');

-- ----------------------------
-- Table structure for tbl_authority
-- ----------------------------
DROP TABLE IF EXISTS `tbl_authority`;
CREATE TABLE `tbl_authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `community_id` int(11) NOT NULL COMMENT '小区ID',
  `time_limit_start` datetime DEFAULT NULL COMMENT '开始时间',
  `time_limit_end` datetime DEFAULT NULL COMMENT '结束时间',
  `dynamic_code` varchar(128) DEFAULT NULL COMMENT '动态码',
  `time_vaild` datetime DEFAULT NULL COMMENT '动态玛时间有效性',
  `times` int(11) DEFAULT NULL COMMENT '剩余次数',
  `state` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `community_id` (`community_id`),
  CONSTRAINT `tbl_authority_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `tbl_community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COMMENT='授权实体表';

-- ----------------------------
-- Records of tbl_authority
-- ----------------------------
INSERT INTO `tbl_authority` VALUES ('36', '7', null, null, 'ff2ff75c2d972e23a0ad00e381c90522', '2019-04-06 11:40:24', '999', '1');
INSERT INTO `tbl_authority` VALUES ('37', '5', null, null, 'e4bc2acf3c479a3db7ff0af37f1c5f9f', '2019-04-17 18:50:50', '999', '0');
INSERT INTO `tbl_authority` VALUES ('38', '6', null, null, 'dd238d2dd6a82174bc3dd1437dfa11b8', '2019-04-17 18:09:44', '999', '1');
INSERT INTO `tbl_authority` VALUES ('40', '6', '2019-03-19 12:55:57', '2019-03-22 12:55:00', '20190319131447', null, '3', null);
INSERT INTO `tbl_authority` VALUES ('41', '7', '2019-03-19 13:01:34', '2019-04-19 13:01:00', '33b931a3c4e8a08987a0fc01f614fa85', '2019-04-17 19:10:34', '3', '1');
INSERT INTO `tbl_authority` VALUES ('42', '5', '2019-04-17 14:54:37', '2019-04-18 14:54:00', '20190417145614', null, '1', null);
INSERT INTO `tbl_authority` VALUES ('43', '5', '2019-04-19 14:54:00', '2019-04-20 14:54:00', '20190417145652', null, '1', null);
INSERT INTO `tbl_authority` VALUES ('44', '5', '2019-04-17 14:54:37', '2019-04-18 14:54:00', '20190417145952', null, '1', null);
INSERT INTO `tbl_authority` VALUES ('45', '5', '2019-04-17 15:08:41', '2019-04-19 15:08:00', 'a1a01894b1ce2e78e196f1f525a1e3b5', '2019-04-17 18:51:46', '1', '0');
INSERT INTO `tbl_authority` VALUES ('46', '6', '2019-04-18 15:08:00', '2019-04-20 15:08:00', '20190417151049', null, '2', null);

-- ----------------------------
-- Table structure for tbl_authority_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_authority_user`;
CREATE TABLE `tbl_authority_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `proprietor_id` int(11) NOT NULL COMMENT '业主账号ID',
  `guest_id` int(11) NOT NULL COMMENT '访客账号ID',
  `authority_id` int(11) NOT NULL COMMENT '授权实体ID',
  `mode` tinyint(4) NOT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `state` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proprietor_id` (`proprietor_id`),
  KEY `guest_id` (`guest_id`),
  KEY `authority_id` (`authority_id`),
  CONSTRAINT `tbl_authority_user_ibfk_1` FOREIGN KEY (`proprietor_id`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `tbl_authority_user_ibfk_2` FOREIGN KEY (`guest_id`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `tbl_authority_user_ibfk_3` FOREIGN KEY (`authority_id`) REFERENCES `tbl_authority` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COMMENT='授权关系表';

-- ----------------------------
-- Records of tbl_authority_user
-- ----------------------------
INSERT INTO `tbl_authority_user` VALUES ('31', '36', '36', '36', '0', '2019-03-19 13:10:00', '0');
INSERT INTO `tbl_authority_user` VALUES ('32', '35', '35', '37', '0', '2019-03-19 13:11:08', '0');
INSERT INTO `tbl_authority_user` VALUES ('33', '35', '35', '38', '0', '2019-03-19 13:11:44', '0');
INSERT INTO `tbl_authority_user` VALUES ('35', '35', '36', '40', '1', '2019-03-19 13:14:47', '1');
INSERT INTO `tbl_authority_user` VALUES ('36', '36', '35', '41', '1', '2019-03-19 13:15:54', '0');
INSERT INTO `tbl_authority_user` VALUES ('37', '35', '36', '42', '1', '2019-04-17 14:56:14', '1');
INSERT INTO `tbl_authority_user` VALUES ('38', '35', '36', '43', '1', '2019-04-17 14:56:52', '1');
INSERT INTO `tbl_authority_user` VALUES ('39', '35', '36', '44', '1', '2019-04-17 14:59:52', '1');
INSERT INTO `tbl_authority_user` VALUES ('40', '35', '36', '45', '1', '2019-04-17 15:03:17', '0');
INSERT INTO `tbl_authority_user` VALUES ('41', '35', '36', '46', '1', '2019-04-17 15:10:49', '0');

-- ----------------------------
-- Table structure for tbl_community
-- ----------------------------
DROP TABLE IF EXISTS `tbl_community`;
CREATE TABLE `tbl_community` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `area_id` int(11) NOT NULL COMMENT '区域ID',
  `community_name` varchar(256) NOT NULL COMMENT '小区名称',
  `address` varchar(512) NOT NULL COMMENT '详细地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `tbl_community_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `tbl_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='小区表';

-- ----------------------------
-- Records of tbl_community
-- ----------------------------
INSERT INTO `tbl_community` VALUES ('-1', '-1', '全局', '全局', '2019-03-19 12:12:39');
INSERT INTO `tbl_community` VALUES ('5', '5', '鸿益·幸福湖畔', '肇庆市端州区星湖大道与蓝塘路交汇处', '2019-03-19 12:37:10');
INSERT INTO `tbl_community` VALUES ('6', '5', ' 海伦堡·林隐天下 ', '肇庆市端州106区肇庆大道南侧', '2019-03-19 12:38:07');
INSERT INTO `tbl_community` VALUES ('7', '5', '肇庆·敏捷城', ' 广东省肇庆市端州区信安大道肇庆·敏捷城', '2019-03-19 12:39:31');
INSERT INTO `tbl_community` VALUES ('8', '5', '中源誉峰', '肇庆市端州区星湖大道与信安大道交汇处（新一院旁）', '2019-04-17 18:56:26');

-- ----------------------------
-- Table structure for tbl_community_admin
-- ----------------------------
DROP TABLE IF EXISTS `tbl_community_admin`;
CREATE TABLE `tbl_community_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `account_id` int(11) NOT NULL COMMENT '账号ID',
  `community_id` int(11) NOT NULL COMMENT '区域ID',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `community_id` (`community_id`),
  CONSTRAINT `tbl_community_admin_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `tbl_community_admin_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `tbl_community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='小区管理员表';

-- ----------------------------
-- Records of tbl_community_admin
-- ----------------------------
INSERT INTO `tbl_community_admin` VALUES ('6', '32', '5', '0', '2019-03-19 12:40:21');
INSERT INTO `tbl_community_admin` VALUES ('7', '33', '6', '0', '2019-03-19 12:40:39');
INSERT INTO `tbl_community_admin` VALUES ('8', '34', '7', '0', '2019-03-19 12:41:04');
INSERT INTO `tbl_community_admin` VALUES ('11', '40', '8', '0', '2019-04-17 19:05:05');

-- ----------------------------
-- Table structure for tbl_guard
-- ----------------------------
DROP TABLE IF EXISTS `tbl_guard`;
CREATE TABLE `tbl_guard` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `community_id` int(11) NOT NULL COMMENT '小区ID',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `description` varchar(256) NOT NULL COMMENT '描述',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `community_id` (`community_id`),
  CONSTRAINT `tbl_guard_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `tbl_community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_guard
-- ----------------------------
INSERT INTO `tbl_guard` VALUES ('6', '5', '0', '东大门', '2019-03-19 12:45:33');
INSERT INTO `tbl_guard` VALUES ('7', '5', '0', '北侧门', '2019-03-19 12:45:42');
INSERT INTO `tbl_guard` VALUES ('8', '5', '0', '西大门', '2019-03-19 12:45:52');
INSERT INTO `tbl_guard` VALUES ('9', '6', '0', '南门', '2019-03-19 12:51:05');
INSERT INTO `tbl_guard` VALUES ('10', '6', '0', '西门', '2019-03-19 12:51:10');
INSERT INTO `tbl_guard` VALUES ('11', '6', '0', '东北门', '2019-03-19 12:51:16');
INSERT INTO `tbl_guard` VALUES ('12', '7', '0', '西北门', '2019-03-19 12:53:50');
INSERT INTO `tbl_guard` VALUES ('13', '7', '0', '东南门', '2019-03-19 12:53:56');
INSERT INTO `tbl_guard` VALUES ('14', '7', '0', '正门', '2019-03-19 12:54:02');

-- ----------------------------
-- Table structure for tbl_log
-- ----------------------------
DROP TABLE IF EXISTS `tbl_log`;
CREATE TABLE `tbl_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `op_id` int(11) NOT NULL COMMENT '操作ID',
  `op_user_id` int(11) NOT NULL COMMENT '操作人账号ID',
  `record_id` int(11) DEFAULT NULL COMMENT '具体某条数据的ID',
  `IP_address` varchar(128) NOT NULL COMMENT 'IP地址',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `description` varchar(256) NOT NULL COMMENT '描述',
  `log_time` datetime NOT NULL COMMENT '记录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作日志表';

-- ----------------------------
-- Records of tbl_log
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_notice
-- ----------------------------
DROP TABLE IF EXISTS `tbl_notice`;
CREATE TABLE `tbl_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `title` varchar(256) NOT NULL COMMENT '公告标题',
  `content` text NOT NULL COMMENT '公告内容',
  `area_id` int(11) DEFAULT '-1' COMMENT '所属区域',
  `community_id` int(11) NOT NULL DEFAULT '-1' COMMENT '所属小区',
  `account_id` int(11) NOT NULL COMMENT '发布时间',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `area_id` (`area_id`),
  KEY `community_id` (`community_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `tbl_notice_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `tbl_area` (`id`),
  CONSTRAINT `tbl_notice_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `tbl_community` (`id`),
  CONSTRAINT `tbl_notice_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `tbl_account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COMMENT='公告表';

-- ----------------------------
-- Records of tbl_notice
-- ----------------------------
INSERT INTO `tbl_notice` VALUES ('38', '测试数据', '测试数据测试数据测试数据测试数据测试数据测试数据', '-1', '-1', '29', '2019-03-19 12:14:10');
INSERT INTO `tbl_notice` VALUES ('39', '测试数据', '测试数据测试数据测试数据测试数据测试数据测试数据', '-1', '-1', '29', '2019-03-19 12:14:18');
INSERT INTO `tbl_notice` VALUES ('41', '端州区测试', '端州区测试端州区测试端州区测试端州区测试端州区测试端州区测试端州区测试', '5', '-1', '30', '2019-03-19 12:31:45');
INSERT INTO `tbl_notice` VALUES ('42', '端州区测试', '端州区测试端州区测试端州区测试端州区测试端州区测试端州区测试', '5', '-1', '30', '2019-03-19 12:31:50');
INSERT INTO `tbl_notice` VALUES ('43', '端州区测试', '端州区测试端州区测试端州区测试端州区测试', '5', '-1', '30', '2019-03-19 12:31:56');
INSERT INTO `tbl_notice` VALUES ('44', '鸿益测试', '鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试', '5', '5', '32', '2019-03-19 12:49:16');
INSERT INTO `tbl_notice` VALUES ('45', '鸿益测试', '鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试', '5', '5', '32', '2019-03-19 12:49:46');
INSERT INTO `tbl_notice` VALUES ('46', '鸿益测试', '鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试鸿益测试', '5', '5', '32', '2019-03-19 12:49:52');
INSERT INTO `tbl_notice` VALUES ('47', '海伦堡测试', '海伦堡测试海伦堡测试海伦堡测试海伦堡测试海伦堡测试海伦堡测试', '5', '6', '33', '2019-03-19 12:53:21');
INSERT INTO `tbl_notice` VALUES ('48', '海伦堡测试', '海伦堡测试海伦堡测试海伦堡测试海伦堡测试海伦堡测试', '5', '6', '33', '2019-03-19 12:53:26');
INSERT INTO `tbl_notice` VALUES ('49', '敏捷城测试', '敏捷城测试敏捷城测试敏捷城测试敏捷城测试敏捷城测试敏捷城测试', '5', '7', '34', '2019-03-19 12:55:16');
INSERT INTO `tbl_notice` VALUES ('50', '敏捷城测试', '敏捷城测试敏捷城测试敏捷城测试敏捷城测试敏捷城测试', '5', '7', '34', '2019-03-19 12:55:21');

-- ----------------------------
-- Table structure for tbl_operation
-- ----------------------------
DROP TABLE IF EXISTS `tbl_operation`;
CREATE TABLE `tbl_operation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `operation_name` varchar(128) NOT NULL COMMENT '操作名称',
  `description` varchar(256) NOT NULL COMMENT '操作具体描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作类型表';

-- ----------------------------
-- Records of tbl_operation
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_permission
-- ----------------------------
DROP TABLE IF EXISTS `tbl_permission`;
CREATE TABLE `tbl_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `op_id` int(11) NOT NULL COMMENT '操作ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_permission
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_proprietor
-- ----------------------------
DROP TABLE IF EXISTS `tbl_proprietor`;
CREATE TABLE `tbl_proprietor` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `account_id` int(11) NOT NULL COMMENT '账号ID',
  `residence_id` int(11) NOT NULL COMMENT '住宅ID',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `authority_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `residence_id` (`residence_id`),
  KEY `authority_user_id` (`authority_user_id`),
  CONSTRAINT `tbl_proprietor_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `tbl_proprietor_ibfk_2` FOREIGN KEY (`residence_id`) REFERENCES `tbl_residence` (`id`),
  CONSTRAINT `tbl_proprietor_ibfk_3` FOREIGN KEY (`authority_user_id`) REFERENCES `tbl_authority_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='业主表';

-- ----------------------------
-- Records of tbl_proprietor
-- ----------------------------
INSERT INTO `tbl_proprietor` VALUES ('18', '35', '9', '0', '2019-03-19 12:56:38', '32');
INSERT INTO `tbl_proprietor` VALUES ('19', '35', '15', '0', '2019-03-19 12:57:14', '33');
INSERT INTO `tbl_proprietor` VALUES ('20', '36', '17', '0', '2019-03-19 13:02:26', '31');
INSERT INTO `tbl_proprietor` VALUES ('21', '35', '8', '1', '2019-04-06 11:29:18', null);
INSERT INTO `tbl_proprietor` VALUES ('22', '35', '17', '1', '2019-04-17 14:17:47', null);
INSERT INTO `tbl_proprietor` VALUES ('23', '35', '18', '1', '2019-04-17 15:06:11', null);
INSERT INTO `tbl_proprietor` VALUES ('24', '35', '16', '1', '2019-04-17 15:09:37', null);

-- ----------------------------
-- Table structure for tbl_record
-- ----------------------------
DROP TABLE IF EXISTS `tbl_record`;
CREATE TABLE `tbl_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `auth_id` int(11) NOT NULL COMMENT '授权关系ID',
  `guard_id` int(11) NOT NULL COMMENT '门禁机器D',
  `record_time` datetime NOT NULL COMMENT '记录时间',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `description` varchar(256) NOT NULL COMMENT '描述',
  `mode` tinyint(4) DEFAULT NULL COMMENT '0',
  PRIMARY KEY (`id`),
  KEY `auth_id` (`auth_id`),
  KEY `guard_id` (`guard_id`),
  CONSTRAINT `tbl_record_ibfk_2` FOREIGN KEY (`guard_id`) REFERENCES `tbl_guard` (`id`),
  CONSTRAINT `tbl_record_ibfk_3` FOREIGN KEY (`auth_id`) REFERENCES `tbl_authority` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8 COMMENT='访问记录表';

-- ----------------------------
-- Records of tbl_record
-- ----------------------------
INSERT INTO `tbl_record` VALUES ('58', '37', '6', '2019-03-19 13:17:00', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('59', '38', '6', '2019-03-19 13:17:08', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('62', '37', '6', '2019-03-19 13:22:48', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('64', '41', '12', '2019-03-19 15:23:12', '0', '访问成功', '1');
INSERT INTO `tbl_record` VALUES ('65', '37', '6', '2019-03-22 20:17:35', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('66', '37', '6', '2019-03-22 20:18:19', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('67', '37', '6', '2019-03-25 15:01:39', '1', '授权信息超时', '0');
INSERT INTO `tbl_record` VALUES ('68', '37', '6', '2019-03-25 15:01:46', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('69', '37', '6', '2019-03-25 15:01:52', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('70', '37', '6', '2019-03-25 15:02:08', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('71', '37', '6', '2019-03-25 15:02:20', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('72', '37', '6', '2019-03-25 15:03:31', '1', '授权信息超时', '0');
INSERT INTO `tbl_record` VALUES ('73', '37', '6', '2019-03-25 15:03:38', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('74', '37', '6', '2019-03-25 15:04:21', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('75', '37', '6', '2019-03-25 15:05:18', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('76', '37', '6', '2019-03-25 15:07:10', '1', '二维码错误', '0');
INSERT INTO `tbl_record` VALUES ('77', '37', '6', '2019-03-25 15:07:39', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('78', '37', '6', '2019-03-25 15:07:44', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('79', '38', '6', '2019-03-25 15:07:49', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('80', '37', '6', '2019-03-25 15:07:54', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('81', '38', '6', '2019-03-25 15:07:58', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('82', '37', '6', '2019-03-25 15:08:03', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('83', '37', '6', '2019-03-25 15:08:12', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('84', '37', '6', '2019-03-25 15:08:16', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('85', '37', '6', '2019-03-25 15:08:20', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('86', '37', '6', '2019-03-25 15:11:24', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('87', '37', '6', '2019-03-25 15:11:56', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('88', '37', '6', '2019-03-25 15:12:38', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('89', '38', '6', '2019-03-25 15:12:44', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('90', '37', '6', '2019-03-25 15:12:51', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('91', '37', '6', '2019-03-25 15:13:03', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('92', '37', '6', '2019-03-25 15:13:08', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('93', '37', '6', '2019-03-25 15:13:13', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('94', '37', '6', '2019-03-25 15:13:18', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('95', '37', '6', '2019-03-25 15:13:24', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('96', '37', '6', '2019-03-25 15:13:29', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('97', '37', '6', '2019-03-25 15:13:34', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('98', '38', '6', '2019-03-25 15:13:39', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('99', '37', '6', '2019-03-25 15:13:44', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('100', '37', '6', '2019-03-25 15:13:49', '1', '二维码错误', '0');
INSERT INTO `tbl_record` VALUES ('101', '37', '6', '2019-03-25 15:13:54', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('102', '37', '6', '2019-03-25 15:13:58', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('103', '37', '6', '2019-03-25 15:14:04', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('104', '37', '6', '2019-03-25 15:16:26', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('105', '37', '6', '2019-03-25 15:16:34', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('106', '38', '6', '2019-03-25 15:16:44', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('107', '37', '6', '2019-04-14 18:06:35', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('108', '38', '6', '2019-04-14 18:06:45', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('109', '37', '6', '2019-04-17 14:26:42', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('110', '41', '6', '2019-04-17 14:26:56', '1', '门禁卡信息错误,不是对应小区门禁卡', '1');
INSERT INTO `tbl_record` VALUES ('111', '38', '6', '2019-04-17 14:27:19', '1', '门禁卡信息错误,不是对应小区门禁卡', '0');
INSERT INTO `tbl_record` VALUES ('112', '37', '6', '2019-04-17 18:32:01', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('113', '37', '6', '2019-04-17 18:32:16', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('114', '37', '6', '2019-04-17 18:33:14', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('115', '45', '6', '2019-04-17 18:35:49', '1', '二维码错误', '1');
INSERT INTO `tbl_record` VALUES ('116', '37', '6', '2019-04-17 18:39:36', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('117', '37', '6', '2019-04-17 18:49:24', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('118', '37', '6', '2019-04-17 18:49:31', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('119', '37', '6', '2019-04-17 18:50:57', '0', '访问成功', '0');
INSERT INTO `tbl_record` VALUES ('120', '45', '6', '2019-04-17 18:51:24', '0', '访问成功', '1');
INSERT INTO `tbl_record` VALUES ('121', '45', '6', '2019-04-17 18:51:50', '0', '访问成功', '1');

-- ----------------------------
-- Table structure for tbl_residence
-- ----------------------------
DROP TABLE IF EXISTS `tbl_residence`;
CREATE TABLE `tbl_residence` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `community_id` int(11) NOT NULL COMMENT '小区ID',
  `building` varchar(256) NOT NULL COMMENT '建筑',
  `floor` tinyint(4) NOT NULL COMMENT '楼层',
  `number` varchar(32) NOT NULL COMMENT '名牌号',
  `state` tinyint(4) NOT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `community_id` (`community_id`),
  CONSTRAINT `tbl_residence_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `tbl_community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='住宅表';

-- ----------------------------
-- Records of tbl_residence
-- ----------------------------
INSERT INTO `tbl_residence` VALUES ('8', '5', '1栋', '2', 'A', '0', '2019-03-19 12:44:22');
INSERT INTO `tbl_residence` VALUES ('9', '5', '1栋', '2', 'B', '0', '2019-03-19 12:44:30');
INSERT INTO `tbl_residence` VALUES ('10', '5', '1栋', '2', 'C', '0', '2019-03-19 12:44:41');
INSERT INTO `tbl_residence` VALUES ('11', '5', '1栋', '2', 'D', '0', '2019-03-19 12:44:48');
INSERT INTO `tbl_residence` VALUES ('12', '5', '2栋', '4', 'A', '0', '2019-03-19 12:44:59');
INSERT INTO `tbl_residence` VALUES ('13', '5', '3栋', '6', 'C', '0', '2019-03-19 12:45:08');
INSERT INTO `tbl_residence` VALUES ('14', '6', '1栋', '15', 'A', '0', '2019-03-19 12:52:31');
INSERT INTO `tbl_residence` VALUES ('15', '6', '2栋', '17', 'C', '0', '2019-03-19 12:52:41');
INSERT INTO `tbl_residence` VALUES ('16', '6', '2栋', '21', 'D', '0', '2019-03-19 12:52:51');
INSERT INTO `tbl_residence` VALUES ('17', '7', '1幢', '2', 'C', '0', '2019-03-19 12:54:31');
INSERT INTO `tbl_residence` VALUES ('18', '7', '2幢', '3', 'C', '0', '2019-03-19 12:54:45');
INSERT INTO `tbl_residence` VALUES ('19', '8', '凤凰苑', '4', 'A', '0', '2019-04-17 19:07:18');
INSERT INTO `tbl_residence` VALUES ('20', '8', '凤凰苑', '3', 'B', '0', '2019-04-17 19:07:32');
INSERT INTO `tbl_residence` VALUES ('21', '8', '翰墨苑', '21', 'C', '0', '2019-04-17 19:07:56');

-- ----------------------------
-- Table structure for tbl_role
-- ----------------------------
DROP TABLE IF EXISTS `tbl_role`;
CREATE TABLE `tbl_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `role_name` varchar(64) NOT NULL COMMENT '角色名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_role
-- ----------------------------
INSERT INTO `tbl_role` VALUES ('1', '超级管理员');
INSERT INTO `tbl_role` VALUES ('2', '区域管理员');
INSERT INTO `tbl_role` VALUES ('3', '小区管理员');
INSERT INTO `tbl_role` VALUES ('4', '普通用户');

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `user_name` varchar(64) NOT NULL COMMENT '用户姓名',
  `phone` varchar(64) DEFAULT NULL COMMENT '手机号码',
  `email` varchar(64) DEFAULT NULL COMMENT '电子邮件',
  `address` varchar(256) DEFAULT NULL COMMENT '常用地址',
  `avaurl` varchar(255) DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('1', 'su', '112233445566', '778899', '广东省肇庆市', '/area/assets/img/user01.png', null);
INSERT INTO `tbl_user` VALUES ('31', '端州', null, '123456@163.com', null, '/su/assets/img/user01.png', null);
INSERT INTO `tbl_user` VALUES ('32', '天河', null, '123456@163.com', null, '/su/assets/img/user02.png', null);
INSERT INTO `tbl_user` VALUES ('33', '鸿益', null, '123456@163.com', null, '/area/assets/img/user02.png', null);
INSERT INTO `tbl_user` VALUES ('34', '海伦堡', null, '123456@qq.com', null, '/area/assets/img/user03.png', null);
INSERT INTO `tbl_user` VALUES ('35', '敏捷城', null, '123456@163.com', null, '/area/assets/img/user05.png', null);
INSERT INTO `tbl_user` VALUES ('36', 'holla', null, null, null, 'https://wx.qlogo.cn/mmopen/vi_32/qyF80iaphPmulOr6tY9l9xCDLoS53SeKP1HTzlwMxniafsRUCcfhb8jVzb4NU73M95UbUX33kCkeviaBXD9PH3Xkw/132', '1');
INSERT INTO `tbl_user` VALUES ('37', '测试号', null, null, null, 'https://wx.qlogo.cn/mmopen/vi_32/3Pibbf0ib4POR1f0DzveWOXia8G9XCe7IriaTauJNHpRdozDoDPLJnwFgTNhngesYkrjVR2Gs1Ngg4s0RricMVd2Mtg/132', '1');
INSERT INTO `tbl_user` VALUES ('38', '~壮和', null, null, null, 'https://wx.qlogo.cn/mmopen/vi_32/ic0xXzbicWGo6NFCJ088sVPvibhYePsFmrib8muWQr9ZELusc8u6GjG479DxIxSK8BxB5rZMfVJBMnA0icP2ZxBDpNA/132', '1');
INSERT INTO `tbl_user` VALUES ('41', '中领誉峰', null, '666@qq.com', null, '/area/assets/img/user06.png', null);
