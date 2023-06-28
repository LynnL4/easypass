<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/11
 * Time: 16:08
 */

namespace community;


class guard extends \MySQLPDO
{
    public function addData($community_id, $description){
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $state = 0;
        $data=['community_id'=>$community_id,'description'=>$description, 'state'=>$state,'create_time'=>$create_time];
        return $this->exec("INSERT INTO `tbl_guard`(community_id,description,state,create_time) VALUES (:community_id,:description,:state,:create_time)",$data);
    }

    public function getList($community_id)
    {
        return $this->fetchAll("SELECT * FROM tbl_guard WHERE community_id = $community_id AND state = 0 ");
    }

    public function deleteData($guard_id)
    {
        return $this->changeState($guard_id, -1);
    }

    public function updateData($guard_id, $description)
    {
        $data=['guard_id'=>$guard_id,'description'=>$description];
        return $this->exec("UPDATE `tbl_guard` SET description=:description WHERE id=:guard_id",$data);
    }

    public function changeState($guard_id, $state)
    {
        $data=['guard_id'=>$guard_id,'state'=>$state];
        return $this->exec("UPDATE `tbl_guard` SET state=:state WHERE id=:guard_id",$data);
    }
}