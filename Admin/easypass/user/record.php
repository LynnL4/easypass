<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/15
 * Time: 21:47
 */

header("Content-Type:text/html;charset=utf-8");
require '../framework/library/MySQLPDO.class.php';
require '../framework/function.php';
require 'record.class.php';

$object = new user\record();

$code = $_REQUEST["code"];

switch ($code) {
    case 14140:
        $account_id = $_GET["account_id"];
        $data = $object->getSelfRecord($account_id);
        break;
    case 14141:
        $account_id = $_GET["account_id"];
        $data = $object->getGuestRecord($account_id);
        break;
}

echo json_encode($data);