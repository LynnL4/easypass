<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/8
 * Time: 15:07
 */

header("Content-Type:text/html;charset=utf-8");
require '../framework/library/MySQLPDO.class.php';
require '../framework/function.php';
require 'auth.class.php';

$object = new \user\auth();

$code = $_REQUEST["code"];

switch ($code){
    case 12120:
        $account_id = $_GET["account_id"];
        $residence_id = $_GET["residence_id"];
        $state = 1;
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $data = $object->addData($account_id, $residence_id, $state, $create_time);
        break;
    case 12121:
        $account_id = $_REQUEST["account_id"];
        $state = $_REQUEST["state"];
        $data = $object->getList($account_id, $state);
        break;
    case 12122:
        $login_name = $_GET["login_name"];
        $data = $object->userIsExist($login_name);
        break;
    case 12123:
        $proprietor_id = $_GET["proprietor_id"];
        $guest_id = $_GET["guest_id"];
        $begin_time = $_GET["begin_time"];
        $end_time = $_GET["end_time"];
        $times = $_GET["times"];
        $data = $object->addAuth($proprietor_id, $guest_id,$begin_time,$end_time, $times);
        break;
    case 12124:
        $account_id = $_REQUEST["account_id"];
        $data = $object->getAuthList($account_id);
        break;
    case 12125:
        $auth_id = $_GET["auth_id"];
        $data = $object->getAuthDetail($auth_id);
        break;
    case 12126:
        $auth_id = $_GET["auth_id"];
        $begin_time = $_GET["begin_time"];
        $end_time = $_GET["end_time"];
        $times = $_GET["times"];
        $data = $object->updateAuth($auth_id,$begin_time,$end_time,$times);
        break;
    case 12127:
        $auth_id = $_REQUEST["auth_id"];
        $data = $object->deleteAuth($auth_id);
        break;
}

echo json_encode($data);