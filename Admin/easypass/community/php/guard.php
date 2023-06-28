<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/11
 * Time: 16:21
 */

header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'guard.class.php';

$object = new \community\guard();

$code = $_REQUEST["code"]; //操作代码

switch ($code) {
    case 10140:
        $community_id = $_POST["community_id"];
        $description = $_POST["description"];
        $data = $object->addData($community_id,$description);
        break;
    case 10144:
        $community_id = $_REQUEST["community_id"];
        $data = $object->getList($community_id);
        break;
    case 10141:
        $guard_id = $_REQUEST["guard_id"];
        $data = $object->deleteData($guard_id);
        break;
    case 10146:
        $guard_id = $_REQUEST["guard_id"];
        $description = $_REQUEST["description"];
        $data = $object->updateData($guard_id,$description);
        break;
    case 10145:
        $guard_id = $_REQUEST["guard_id"];
        $state = $_REQUEST["state"];
        $data = $object->changeState($guard_id, $state);
        break;
}


echo json_encode($data);

