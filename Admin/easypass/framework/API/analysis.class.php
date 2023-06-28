<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/17
 * Time: 14:30
 */

class analysis extends \MySQLPDO
{
    public function getCoummityMonth()
    {
        date_default_timezone_set('PRC');
        $nowYear = date("Y");
        $nowMonth = date("m");

        $start_time = ($nowYear-1).'-'.($nowMonth)."-01";
        if($nowMonth != 12){
            $end_time = $nowYear.'-'.($nowMonth+1)."-01";
        }else{
            $end_time = ($nowYear+1).'-01-01';
        }
        return $this->fetchAll("SELECT count(*) AS newC FROM tbl_community WHERE (unix_timestamp(tbl_community.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))");
    }

    public function getAreaCommunityMonth($area_id)
    {
        date_default_timezone_set('PRC');
        $nowYear = date("Y");
        $nowMonth = date("m");

        $start_time = ($nowYear-1).'-'.($nowMonth)."-01";
        if($nowMonth != 12){
            $end_time = $nowYear.'-'.($nowMonth+1)."-01";
        }else{
            $end_time = ($nowYear+1).'-01-01';
        }
        return $this->fetchAll("SELECT count(*) AS newC FROM tbl_community WHERE tbl_community.area_id = $area_id AND (unix_timestamp(tbl_community.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))");
    }

    public function  getAccountAllSum(){
        return $this->fetchAll("SELECT  count(*) AS sumA FROM tbl_account WHERE role_id = 4");
    }

    public function  getAccountComSum($community_id){
        return $this->fetchAll("SELECT COUNT(*) AS sumA FROM tbl_proprietor, tbl_community, tbl_residence WHERE tbl_community.id = $community_id AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.residence_id = tbl_residence.id");
    }

    public function getNewAccountToday()
    {
        date_default_timezone_set('PRC');
        $now = date("Y-m-d");
        $start_time = $now.' 00:00:00';
        $end_time = $now.' 23:59:59';
        return $this->fetchAll("SELECT  count(*) AS newA FROM tbl_account WHERE role_id = 4 AND (unix_timestamp(tbl_account.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))");
    }

    public function getNewAccountComToday($community_id)
    {
        date_default_timezone_set('PRC');
        $now = date("Y-m-d");
        $start_time = $now.' 00:00:00';
        $end_time = $now.' 23:59:59';
        return $this->fetchAll("SELECT COUNT(*) AS newA FROM tbl_proprietor, tbl_community, tbl_residence WHERE tbl_community.id = $community_id AND (unix_timestamp(tbl_proprietor.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.residence_id = tbl_residence.id");
    }

    public function getAccountAreaSum($area_id)
    {
        return $this->fetchAll("SELECT COUNT(*) AS sumA FROM tbl_proprietor, tbl_community, tbl_residence, tbl_area WHERE tbl_area.id = $area_id AND tbl_community.area_id = tbl_area.id AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.residence_id = tbl_residence.id");
    }



    public function getNewAccountAreaToday($area_id)
    {
        date_default_timezone_set('PRC');
        $now = date("Y-m-d");
        $start_time = $now.' 00:00:00';
        $end_time = $now.' 23:59:59';
        return $this->fetchAll("SELECT COUNT(*) as newA FROM tbl_proprietor, tbl_community, tbl_residence, tbl_area WHERE tbl_area.id = $area_id AND (unix_timestamp(tbl_proprietor.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))AND tbl_community.area_id = tbl_area.id AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.residence_id = tbl_residence.id");
    }


    public function getRecordWeek($community_id)
    {
        date_default_timezone_set('PRC');
        $now = date("Y-m-d");

        $res = [];

        for($i = 0; $i <= 6; $i++)
        {
            $date = date("Y-m-d",strtotime("-$i day",strtotime($now)));
            $start_time = $date.' 00:00:00';
            $end_time = $date.' 23:59:59';

            $res[$i] = $this->fetchAll("SELECT  count(*) AS record
                                     FROM tbl_record, tbl_authority
                                     WHERE tbl_authority.community_id = $community_id AND(unix_timestamp(tbl_record.record_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))
                                     AND tbl_record.auth_id = tbl_authority.id")[0]["record"];
        }
        return $res;
    }

    public function getRecordToday($community_id)
    {
        date_default_timezone_set('PRC');
        $date = date("Y-m-d");
        $start_time = $date.' 00:00:00';
        $end_time = $date.' 23:59:59';

        $res = $this->fetchAll("SELECT  count(*) AS record
                                     FROM tbl_record, tbl_authority
                                     WHERE tbl_authority.community_id = $community_id AND(unix_timestamp(tbl_record.record_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))
                                     AND tbl_record.auth_id = tbl_authority.id");
        return $res;

    }

    public function getAreaWeek($area_id)
    {
        date_default_timezone_set('PRC');
        $now = date("Y-m-d");

        $res = [];

        for($i = 0; $i <= 6; $i++)
        {
            $date = date("Y-m-d",strtotime("-$i day",strtotime($now)));
            $start_time = $date.' 00:00:00';
            $end_time = $date.' 23:59:59';

            $res[$i] = $this->fetchAll("SELECT COUNT(*) as newA FROM tbl_proprietor, tbl_community, tbl_residence, tbl_area WHERE tbl_area.id = $area_id AND (unix_timestamp(tbl_proprietor.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))AND tbl_community.area_id = tbl_area.id AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.residence_id = tbl_residence.id")[0]["newA"];
        }
        return $res;
    }

    public function getAllWeek()
    {
        date_default_timezone_set('PRC');
        $now = date("Y-m-d");

        $res = [];

        for($i = 0; $i <= 6; $i++)
        {
            $date = date("Y-m-d",strtotime("-$i day",strtotime($now)));
            $start_time = $date.' 00:00:00';
            $end_time = $date.' 23:59:59';

            $res[$i] = $this->fetchAll("SELECT  count(*) AS newA FROM tbl_account WHERE role_id = 4 AND (unix_timestamp(tbl_account.create_time) between unix_timestamp('$start_time') and unix_timestamp('$end_time'))")[0]["newA"];
        }
        return $res;
    }
}