<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/2/28
 * Time: 20:02
 */

namespace su;


class area extends \MySQLPDO
{
    public function getList()
    {
        return $this->fetchAll("SELECT * FROM tbl_area WHERE  id != -1 ORDER BY area_code ASC ");
    }

    public function addData($area_code,$prov,$city,$dist,$create_time)
    {

        if(!$this->isExist($area_code))
        {
            $data=['area_code'=>$area_code,'prov'=>$prov,'city'=>$city,'dist'=>$dist, 'create_time'=>$create_time];
            return $this->exec("INSERT INTO `tbl_area`(area_code,prov,city,dist,create_time) VALUES (:area_code,:prov,:city,:dist,:create_time)",$data);
        }
        else{
            return '2';
        }

    }

    public function search($key)
    {
        return $this->fetchAll("SELECT * FROM tbl_area WHERE area_code LIKE '%$key%' OR prov LIKE '%$key%' OR city LIKE '%$key%' OR dist LIKE'%$key%'  ORDER BY area_code ");
    }

    public function deleteData($id)
    {
        return $this->exec("DELETE FROM `tbl_area` WHERE id='$id'");
    }

    public function isExist($area_code)
    {
        return $this->exec("SELECT id FROM `tbl_area` WHERE `area_code`='$area_code'");
    }

}