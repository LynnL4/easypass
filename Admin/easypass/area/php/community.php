<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/4
 * Time: 16:29
 */

header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'community.class.php';

$object = new \area\community();

$code = $_REQUEST["code"]; //操作代码

switch ($code) {
    case 10144:
        $area_id = $_REQUEST["area_id"];
        $data = $object->getList($area_id);
        break;
    case 10140:
        $area_id = $_POST['area_id'];
        $community_name = $_POST['community_name'];
        $address = $_POST['address'];
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $data = $object->addData($area_id, $community_name, $address, $create_time);
        break;
    case 10143:
        $id = $_REQUEST["id"];
        $data = $object->deleteData($id);
        break;
    case 10147:
        $key = $_REQUEST["key"];
        $data = $object->search($key);
        break;

}

echo json_encode($data);