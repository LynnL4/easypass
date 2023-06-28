<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/2/28
 * Time: 15:19
 */
namespace su;

class notice extends \MySQLPDO
{
    public function getList($area_id, $community_id) //获取列表
    {
        return $this->fetchAll("SELECT tbl_notice.id, tbl_notice.title, DATE_FORMAT(tbl_notice.create_time,\"%Y-%m-%d\" )AS date, tbl_user.user_name,tbl_notice.community_id  
                                     FROM tbl_notice,tbl_account, tbl_user 
                                     WHERE tbl_account.id = tbl_notice.account_id AND tbl_account.user_id = tbl_user.id  AND (tbl_notice.area_id = $area_id OR tbl_notice.area_id = -1) AND (tbl_notice.community_id = $community_id OR tbl_notice.community_id = -1)
                                     ORDER BY tbl_notice.id DESC ");
    }

    public function getLastList($area_id, $community_id)//获取6条最新列表
    {
        return $this->fetchAll("SELECT tbl_notice.id, tbl_notice.title, DATE_FORMAT(tbl_notice.create_time,\"%Y-%m-%d\" )AS date, tbl_user.user_name 
                                     FROM tbl_notice,tbl_account, tbl_user 
                                     WHERE tbl_account.id = tbl_notice.account_id AND tbl_account.user_id = tbl_user.id  AND (tbl_notice.area_id = $area_id OR tbl_notice.area_id = -1) AND (tbl_notice.community_id = $community_id OR tbl_notice.community_id = -1)
                                     ORDER BY tbl_notice.id DESC LIMIT 6");
    }

    public function search($area_id, $community_id, $key)//关键字搜索
    {
        return $this->fetchAll("SELECT tbl_notice.id, tbl_notice.title, DATE_FORMAT(tbl_notice.create_time,\"%Y-%m-%d\" )AS date, tbl_user.user_name,tbl_notice.community_id  
                                     from tbl_notice,tbl_account, tbl_user 
                                     WHERE tbl_account.id = tbl_notice.account_id AND tbl_account.user_id = tbl_user.id  AND (tbl_notice.area_id = $area_id OR tbl_notice.area_id = -1) AND (tbl_notice.community_id = $community_id OR tbl_notice.community_id = -1) AND (tbl_notice.title LIKE '%$key%' OR tbl_user.user_name LIKE '%$key%' OR tbl_notice.content LIKE '%$key%')");
    }

    public function deleteData($id) //删除记录
    {
        return $this->exec("DELETE FROM `tbl_notice` WHERE id='$id'");
    }

    public function getDetailByID($id) //详情
    {
        return $this->fetchAll("SELECT tbl_notice.id, tbl_notice.title,tbl_notice.content, DATE_FORMAT(tbl_notice.create_time,\"%Y-%m-%d\" )AS date, tbl_user.user_name 
                                     from tbl_notice,tbl_account, tbl_user 
                                     WHERE tbl_account.id = tbl_notice.account_id AND tbl_account.user_id = tbl_user.id  AND tbl_notice.id = $id
                                     ORDER BY tbl_notice.id DESC ");
    }

    public function addData($title, $content, $area_id, $community_id, $account_id,$create_time ) //删除记录
    {
        return $this->exec("INSERT INTO `tbl_notice` (`title`, `content`, `area_id`, `community_id`, `account_id`, `create_time`) VALUES ('$title', '$content', '$area_id', '$community_id', '$account_id', '$create_time')");
    }
}