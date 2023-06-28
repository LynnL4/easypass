<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/8
 * Time: 14:41
 */

namespace user;


class auth extends \MySQLPDO
{
    public function  getList($account_id, $state)
    {
        return $this->fetchAll( "SELECT tbl_proprietor.id,tbl_community.community_name, tbl_community.address, tbl_residence.building, tbl_residence.floor, tbl_residence.number 
                                       FROM tbl_proprietor, tbl_residence, tbl_community 
                                       WHERE tbl_proprietor.residence_id = tbl_residence.id AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.state = $state AND tbl_proprietor.account_id = $account_id");
    }

    public function isExist($account_id,$residence_id,$state)
    {
        return $this->fetchAll( "SELECT tbl_proprietor.id,tbl_community.community_name, tbl_community.address, tbl_residence.building, tbl_residence.floor, tbl_residence.number 
                                       FROM tbl_proprietor, tbl_residence, tbl_community 
                                       WHERE tbl_proprietor.residence_id = tbl_residence.id AND tbl_residence.community_id = tbl_community.id AND tbl_proprietor.state = $state AND tbl_proprietor.account_id = $account_id AND tbl_proprietor.residence_id=$residence_id");
    }

    public function addData($account_id, $residence_id, $state, $create_time)
    {
        $res = $this->isExist($account_id,$residence_id,1);
        if(!count($res)){
            $res = $this->isExist($account_id,$residence_id,0);
            if(!count($res)){
                $data=['account_id'=>$account_id,'residence_id'=>$residence_id, 'state'=>$state, 'create_time'=>$create_time];
                return $this->exec("INSERT INTO tbl_proprietor(account_id, residence_id, state, create_time) VALUES(:account_id,:residence_id,:state,:create_time)", $data);
            }
            else
            {
                return -2;
            }
         }
        else{
            return -1;
        }

    }

    public function userIsExist($login_name)
    {
        $res = $this->fetchAll("SELECT id FROM tbl_account WHERE login_name LIKE '$login_name' AND role_id=4");
        if(count($res)){
            return $res[0]["id"];
        }else{
            return -2;
        }
    }

    public function getCommunityId($proprietor_id)
    {
        $data = $this->fetchAll("SELECT tbl_community.id 
                                       FROM tbl_community, tbl_proprietor, tbl_residence 
                                       WHERE tbl_residence.community_id = tbl_community.id AND tbl_proprietor.residence_id = tbl_residence.id AND tbl_proprietor.id = $proprietor_id");

        return $data[0]['id'];
    }

    public function getAccountId($proprietor_id)
    {
        $data = $this->fetchAll("SELECT account_id FROM tbl_proprietor WHERE id = $proprietor_id");
        return $data[0]['account_id'];
    }

    public function addItemToAuth($proprietor_id,$begin_time, $end_time, $times) //将信息添加到用户信息列表
    {
        date_default_timezone_set('PRC');
        $community_id = $this->getCommunityId($proprietor_id);
        $dynamic_code = date("YmdHis");


        $data=['community_id'=>$community_id,'dynamic_code'=>$dynamic_code,'begin_time'=>$begin_time,'end_time'=>$end_time, 'times'=>$times];
        if($this->exec("INSERT INTO `tbl_authority`(community_id,dynamic_code,time_limit_start, time_limit_end,times) VALUES (:community_id,:dynamic_code,:begin_time,:end_time,:times)",$data)){
            $auth_id = $this->fetchAll("SELECT id FROM `tbl_authority` WHERE `community_id` = '$community_id' AND `dynamic_code` = '$dynamic_code'");
            return $auth_id[0]['id'];
        }
        else{
            return -1;
        }
    }

    public function addAuth($proprietor_id,$guest_id,$begin_time,$end_time,$times)
    {
       $isExist = $this->authIsExist($proprietor_id,$guest_id );
        if($isExist == -1){
            return -2;
        }

        $authority_id = $this->addItemToAuth($proprietor_id,$begin_time,$end_time,$times);

        if(!count($authority_id)) {
            return -1;
        }
        $account_id = $this->getAccountId($proprietor_id);
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $state = 0;
        $mode = 1;

        $data=['authority_id'=>$authority_id,'guest_id'=>$guest_id ,'mode'=>$mode,'account_id'=>$account_id ,'state'=>$state ,'create_time'=>$create_time ];

        if($this->exec("INSERT INTO `tbl_authority_user`(authority_id,guest_id,proprietor_id,mode,state,create_time) VALUES (:authority_id,:guest_id,:account_id,:mode,:state,:create_time)",$data))
        {
            $authority_user_id = $this->fetchAll("SELECT id FROM `tbl_authority_user` WHERE `authority_id` = '$authority_id' AND `create_time` = '$create_time' AND proprietor_id = $account_id");
            return $authority_user_id[0]["id"];
        }else{
            return -1;
        }
    }

    public function authIsExist($proprietor_id,$guest_id )
    {
        $community_id = $this->getCommunityId($proprietor_id);
        $account_id = $this->getAccountId($proprietor_id);
        $data = $this->fetchAll("SELECT tbl_authority.id FROM tbl_authority, tbl_authority_user 
                                       WHERE tbl_authority_user.guest_id = $guest_id AND tbl_authority_user.state = 0 AND tbl_authority_user.proprietor_id = $account_id AND tbl_authority_user.authority_id = tbl_authority.id  AND tbl_authority.community_id = $community_id");

        if(count($data)){
            return -1;
        }else {
            return 0;
        }
    }

    public function getAuthList($account_id)
    {
        return $this->fetchAll("SELECT tbl_authority.id,tbl_community.community_name, tbl_user.user_name, tbl_user.avaurl 
                                      FROM tbl_authority_user, tbl_authority, tbl_community, tbl_account,tbl_user 
                                      WHERE tbl_authority_user.authority_id = tbl_authority.id AND tbl_authority_user.mode = 1 AND tbl_authority_user.state=0 AND tbl_authority.community_id = tbl_community.id AND tbl_authority_user.guest_id = tbl_account.id AND tbl_account.user_id = tbl_user.id AND tbl_authority_user.proprietor_id = $account_id");
    }

    public function getAuthDetail($auth_id)
    {
        return $this->fetchAll("SELECT tbl_authority.*,tbl_account.login_name,tbl_community.community_name 
                                     FROM tbl_authority,tbl_authority_user,tbl_account,tbl_community
                                     WHERE tbl_authority.id=$auth_id AND tbl_authority_user.authority_id = tbl_authority.id AND tbl_authority_user.guest_id = tbl_account.id AND tbl_authority.community_id = tbl_community.id;");
    }

    public function updateAuth($authority_id,$time_limit_start,$time_limit_end,$times)
    {
        $data=['authority_id'=>$authority_id,'time_limit_start'=>$time_limit_start ,'time_limit_end'=>$time_limit_end ,'times'=>$times  ];

        if($this->exec("UPDATE tbl_authority SET time_limit_start =:time_limit_start , time_limit_end =:time_limit_end , times = :times WHERE id=:authority_id;",$data))
        {
            return 0;
        }else{
            return -1;
        }
    }

    public function getAuthUserId($auth_id)
    {
        $res = $this->fetchAll("SELECT * FROM tbl_authority_user WHERE authority_id =  $auth_id");
        return $res[0]["id"];
    }

    public function deleteAuth($auth_id)
    {
        $authority_user_id = $this->getAuthUserId($auth_id);
        $data=['authority_user_id'=>$authority_user_id,'state'=>1  ];
        return $this->exec("UPDATE tbl_authority_user SET state = :state WHERE id=:authority_user_id;",$data);
    }

}