<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/2/28
 * Time: 21:41
 */

header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'role.class.php';

$object = new \area\role();

$code = $_REQUEST["code"]; //操作代码

switch ($code) {
    case 10104:
        $area_id =  $_REQUEST["area_id"];
        $data = $object->getList($area_id);
        break;
    case 10100:
        $community_id =  $_POST['community_id'];
        $user_name =  $_POST['user_name'];
        $email =  $_POST['email'];
        $data = $object->addCommunityAdmin($community_id, $user_name, $email);
        break;
    case 10103:
        $id = $_REQUEST["id"];
        $data = $object->deleteData($id);
        break;
    case 10106:
        $id = $_REQUEST["id"];
        $data = $object->Reset($id);
        break;
}


echo json_encode($data);
