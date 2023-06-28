<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/17
 * Time: 14:37
 */
header("Content-Type:text/html;charset=utf-8");
require '../library/MySQLPDO.class.php';
require '../function.php';
require 'analysis.class.php';

$object = new analysis();

$code = $_REQUEST["code"];
switch ($code){
    case 11000:
        $data = array(
            'newA' => $object->getNewAccountToday()[0]["newA"],
            'newC' => $object->getCoummityMonth()[0]["newC"],
            'sumA' =>$object->getAccountAllSum()[0]["sumA"]
        );
        break;
    case 11001:
        $area_id = $_REQUEST["area_id"];
        $data = array(
            'newA' => $object->getNewAccountAreaToday($area_id)[0]["newA"],
            'newC' => $object->getAreaCommunityMonth($area_id)[0]["newC"],
            'sumA' =>$object->getAccountAreaSum($area_id)[0]["sumA"]
        );
        break;
    case 11002:
        $community_id = $_REQUEST["community_id"];
        $data = array(
            'newA' => $object->getNewAccountComToday($community_id)[0]["newA"],
            'record' => $object->getRecordToday($community_id)[0]["record"],
            'sumA' =>$object->getAccountComSum($community_id)[0]["sumA"]
        );
        break;
    case 11003:
        $data = $object->getAllWeek();
        break;
    case 11004:
        $area_id = $_REQUEST["area_id"];
        $data = $object->getAreaWeek($area_id);
        break;
    case 11005:
        $community_id = $_REQUEST["community_id"];
        $data = $object->getRecordWeek($community_id);
        break;
}
echo json_encode($data);