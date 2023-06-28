<?php
/**
 * Created by PhpStorm.
 * User: LHT
 * Date: 2018/4/12
 * Time: 10:23
 * function: 数据库连接配置
 */

/**************防止php页面被直接访问，部署时一定要选取消注释*************/
/*
if( $_SERVER['HTTP_REFERER'] == "" )
{
    header("Location:".'/home/html/404NotFound.html'); exit;
}
*/
    return [
        'DB_CONFIG' =>[
            'db' => 'mysql',
            'host' => 'localhost',
            'port' => '3306',
            'user' => 'root',
            'pass'=> '',
            'charset' => 'utf8',
            'dbname' => 'access',
            //Session相关的配置
            'PHPSESSID_HTTPONLY' => true
        ]
    ];