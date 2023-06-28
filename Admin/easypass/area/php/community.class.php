<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/4
 * Time: 16:26
 */

namespace area;


class community extends \MySQLPDO
{
    public function getList($area_id){
        return $this->fetchAll("SELECT * FROM tbl_community WHERE  area_id = $area_id");
    }

    public function addData($area_id,$community_name,$address,$create_time)
    {
        $data=['area_id'=>$area_id,'community_name'=>$community_name,'address'=>$address,'create_time'=>$create_time];
        return $this->exec("INSERT INTO `tbl_community`(area_id,community_name,address,create_time) VALUES (:area_id,:community_name,:address,:create_time)",$data);
    }

    public function search($key)
    {
        return $this->fetchAll("SELECT * FROM tbl_community WHERE community_name LIKE '%$key%' OR address LIKE '%$key%'");
    }

    public function deleteData($id)
    {
        return $this->exec("DELETE FROM `tbl_community` WHERE id='$id'");
    }
}