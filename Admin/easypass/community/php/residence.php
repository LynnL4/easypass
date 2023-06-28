<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/5
 * Time: 17:05
 */

header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'residence.class.php';

$object = new \community\residence();

$code = $_REQUEST["code"]; //操作代码

switch ($code) {
    case 10144:
        $community_id =  $_REQUEST["community_id"];
        $data = $object->getList($community_id);
        break;
    case 10140:
        $community_id = $_POST["community_id"];
        $building =  $_POST["building"];
        $floor = $_POST["floor"];
        $number = $_POST["number"];
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $data = $object->addData($community_id,$building,$floor,$number,$create_time);
        break;
    case 10145:
        $key = $_REQUEST["key"];
        $community_id = $_REQUEST["community_id"];
        $data = $object->search($community_id,$key);
        break;
    case 10143:
        $id= $_REQUEST["id"];
        $data = $object->deleteData($id);
        break;

}


echo json_encode($data);