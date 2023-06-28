<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/7
 * Time: 15:12
 */

header("Content-Type:text/html;charset=utf-8");
require '../framework/library/MySQLPDO.class.php';
require '../framework/function.php';
require 'selfInfo.class.php';

$object = new \user\selfInfo();

$code = $_GET['code'];//小程序传来的code值
$nick = $_GET['nick'];//小程序传来的用户昵称
$imgUrl = $_GET['avaurl'];//小程序传来的用户头像地址
$sex = $_GET['sex'];//小程序传来的用户性别

$data = $object->register($code,$nick,$imgUrl,$sex);
echo json_encode($data);
