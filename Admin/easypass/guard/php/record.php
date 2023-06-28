<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/14
 * Time: 21:40
 */

header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'record.class.php';

$object = new \guard\record();

$code = $_REQUEST["code"];
switch ($code) {
    case 10150:
        $guard_id = $_GET["guard_id"];//3;
        $mode = $_GET["mode"];//0;
        $state = $_GET["state"];//1;
        $start = $_GET["start"];//"2019-3-12";
        $end = $_GET["end"];//"2019-3-15";
        $data = $object->getList($guard_id,$mode,$state,$start,$end);
        break;
}

echo json_encode($data);