<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/2
 * Time: 14:36
 */

header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'selfInfo.class.php';

$object = new \area\selfInfo();

$code = $_REQUEST["code"]; //操作代码

switch ($code) {
    case 11103:
        $login_name = $_REQUEST["login_name"];
        $password = $_REQUEST["password"];
        $data = $object->login($login_name, $password);
        if(!count($data)){
            $data = -1;
        }else{
            $data = $data[0]["id"]."&".$data[0]["area_id"]."&".$data[0]["community_id"]."&".$data[0]["role_id"];
        }
        break;
    case 11102:
        $login_name = $_POST["login_name"];
        $old_password = $_POST["old_password"];
        $new_password = $_POST["new_password"];
        $data = $object->changePwd($login_name, $old_password,$new_password);
        break;
    case 11100:
        $account_id = $_REQUEST["account_id"];
        $data = $object->getSelfInfo($account_id);
        break;
}

echo json_encode($data);