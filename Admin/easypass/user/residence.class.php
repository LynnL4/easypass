<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/7
 * Time: 20:05
 */

namespace user;


class residence extends \MySQLPDO
{
    public function getCommunity($code){
        return $this->fetchAll("SELECT tbl_community.id, tbl_community.community_name, tbl_community.address FROM `tbl_community`,`tbl_area` WHERE tbl_area.area_code = $code AND tbl_area.id=tbl_community.area_id");
    }

    public function getBuilding($community_id)
    {
        return $this->fetchAll("SELECT DISTINCT building FROM tbl_residence WHERE community_id = $community_id");
    }

    public function getFloor($community_id, $building)
    {
        return $this->fetchAll("SELECT DISTINCT floor FROM tbl_residence WHERE community_id = $community_id AND building LIKE '$building'");
    }

    public function getResidence($community_id,$building, $floor)
    {
        return $this->fetchAll("SELECT DISTINCT id,number FROM tbl_residence WHERE community_id = $community_id AND building LIKE '$building' AND floor = $floor");
    }
}