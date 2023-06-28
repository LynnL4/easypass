<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/10
 * Time: 14:56
 */

header("Content-Type:text/html;charset=utf-8");
require '../framework/library/MySQLPDO.class.php';
require '../framework/function.php';
require 'access.class.php';

$object = new user\access();

$code = $_REQUEST["code"];

switch ($code) {
    case 12140:
        $account_id = $_GET["account_id"];
        $data = $object->getProAccessList($account_id);
        break;
    case 12141:
        $account_id = $_GET["account_id"];
        $data = $object->getGuestAccessList($account_id);
        break;
    case 12142:
        $authority_id=$_GET["authority_id"];
        $data = $object->apply($authority_id);
        break;
    case 12143:
        $authority_id=$_GET["authority_id"];
        $data = $object->getState($authority_id);
        break;
}

echo json_encode($data);