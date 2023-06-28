<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/7
 * Time: 15:43
 */

header("Content-Type:text/html;charset=utf-8");
require '../framework/library/MySQLPDO.class.php';
require '../framework/function.php';
require 'selfInfo.class.php';

$object = new \user\selfInfo();

$id = $_GET["id"];
$data = $object->getLoginName($id);

echo json_encode($data);