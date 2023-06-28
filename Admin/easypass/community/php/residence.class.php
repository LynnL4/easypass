<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/5
 * Time: 17:02
 */

namespace community;


class residence extends \MySQLPDO
{
    public function getList($community_id){
        return $this->fetchAll("SELECT * FROM tbl_residence WHERE community_id = $community_id ORDER BY building ASC, floor ASC, number ASC");
    }

    public function addData($community_id,$building,$floor,$number, $create_time)
    {
        $state = 0;
        $data=['community_id'=>$community_id,'building'=>$building,'floor'=>$floor,'number'=>$number, 'state'=>$state,'create_time'=>$create_time];
        return $this->exec("INSERT INTO `tbl_residence`(community_id,building,floor,number,state,create_time) VALUES (:community_id,:building,:floor,:number,:state,:create_time)",$data);
    }

    public function search($community_id,$key)
    {
        return $this->fetchAll("SELECT * FROM tbl_residence WHERE (building LIKE '%$key%' OR floor LIKE '%$key%' OR number LIKE '%$key%') AND community_id = $community_id");
    }

    public function deleteData($id)
    {
        return $this->exec("DELETE FROM `tbl_residence` WHERE id='$id'");
    }
}