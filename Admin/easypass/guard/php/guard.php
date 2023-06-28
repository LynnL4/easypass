<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/13
 * Time: 14:27
 */


header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'guard.class.php';

$object = new \guard\guard();

$code = $_REQUEST["code"];
switch ($code) {
    case 10144:
        $community_id = $_REQUEST["community_id"];
        $data = $object->getList($community_id);
        break;
    case 10142:
        $guard_id = $_REQUEST["guard_id"];
        $data = $object->getDetail($guard_id);
        break;
    case 10143;
        $auth_id = $_POST['auth_id'];
        $community_id = $_POST["community_id"];
        $dynamic_code = $_POST['dynamic_code'];
        $guard_id = $_POST["guard_id"];
        $data = $object->vaild($auth_id,$guard_id,$community_id,$dynamic_code);
        break;
}

echo json_encode($data);