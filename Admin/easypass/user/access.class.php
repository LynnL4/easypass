<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/10
 * Time: 14:19
 */

namespace user;


class access extends \MySQLPDO
{
    public function getProAccessList($account_id)
    {
        return $this->fetchAll("SELECT tbl_authority.id, tbl_authority.time_limit_start, tbl_authority.time_limit_end, tbl_authority.times, tbl_community.community_name,tbl_community.address 
                                    FROM tbl_authority, tbl_authority_user, tbl_community 
                                    WHERE  tbl_authority_user.mode = 0 AND tbl_authority_user.proprietor_id = $account_id AND tbl_authority_user.authority_id = tbl_authority.id AND tbl_authority.community_id = tbl_community.id AND tbl_authority_user.state = 0
                                    GROUP BY tbl_community.id");
    }

    public function getGuestAccessList($account_id)
    {
        return $this->fetchAll("SELECT tbl_authority.id, tbl_authority.time_limit_start, tbl_authority.time_limit_end, tbl_authority.times, tbl_community.community_name,tbl_community.address 
                                    FROM tbl_authority, tbl_authority_user, tbl_community 
                                    WHERE  tbl_authority_user.mode = 1 AND tbl_authority_user.guest_id = $account_id AND tbl_authority_user.authority_id = tbl_authority.id AND tbl_authority.community_id = tbl_community.id AND tbl_authority_user.state = 0");
    }

    public function apply($authority_id)
    {
        date_default_timezone_set('PRC');
        $dynamic_code = date("YmdHis");
        $dynamic_code = md5($dynamic_code);
        $time_valid = date("Y-m-d H:i:s");
        $state = 1;

        $data=['dynamic_code'=>$dynamic_code,'time_valid'=>$time_valid, 'authority_id'=>$authority_id, 'state'=>$state];
        $this->exec("UPDATE tbl_authority SET dynamic_code =:dynamic_code, time_vaild =:time_valid, state=:state WHERE id=:authority_id",$data);

        $dynamic_code = sha1($dynamic_code);

        return  $dynamic_code;
    }



    public function getState($authority_id)
    {
        return $this->fetchAll("SELECT state FROM tbl_authority WHERE id=$authority_id");
    }

}