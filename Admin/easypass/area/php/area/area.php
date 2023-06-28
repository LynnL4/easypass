<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/2/28
 * Time: 20:13
 */

header("Content-Type:text/html;charset=utf-8");
require '../../../framework/library/MySQLPDO.class.php';
require '../../../framework/function.php';
require 'area.class.php';

$object = new \su\area();

$code = $_REQUEST["code"]; //操作代码

switch ($code){
    case 10134:
        $data = $object->getList();
        break;
    case 10130:
        $area_code = $_POST['area_code'];
        $prov = $_POST['prov'];
        $city = $_POST['city'];
        $dist = $_POST['dist'];
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $data = $object->addData($area_code,$prov,$city,$dist, $create_time);
        break;
    case 10135:
        $key = $_REQUEST["key"];
        $data = $object->search($key);
        break;
    case 10133:
        $id= $_REQUEST["id"];
        $data = $object->deleteData($id);
        break;
}

echo json_encode($data);


