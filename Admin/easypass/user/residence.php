<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/7
 * Time: 20:14
 */

header("Content-Type:text/html;charset=utf-8");
require '../framework/library/MySQLPDO.class.php';
require '../framework/function.php';
require 'residence.class.php';

$object = new \user\residence();

$code = $_REQUEST["code"];
switch ($code) {
    case 10144:
        $area_code = $_GET["area_code"];
        $data = $object->getCommunity($area_code);
        break;
    case 10145:
        $community_id = $_GET["community_id"];
        $data = $object->getBuilding($community_id);
        break;
    case 10146:
        $community_id = $_GET["community_id"];
        $building = $_GET["building"];
        $data = $object->getFloor($community_id, $building);
        break;
    case 10147:
        $community_id = $_REQUEST["community_id"];
        $building = $_REQUEST["building"];
        $floor = $_REQUEST["floor"];
        $data = $object->getResidence($community_id, $building, $floor);
}

echo json_encode($data);