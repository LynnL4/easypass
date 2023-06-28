<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/8
 * Time: 16:43
 */

namespace community;


class auth extends \MySQLPDO
{
    public function getList($community_id, $state)
    {
        if($state == -1){
            return $this->fetchAll( "SELECT tbl_proprietor.id,tbl_account.login_name,tbl_community.community_name, tbl_community.address, tbl_residence.building, tbl_residence.floor, tbl_residence.number, tbl_user.user_name,tbl_user.avaurl
                                       FROM tbl_proprietor, tbl_residence, tbl_community,tbl_user,tbl_account 
                                       WHERE tbl_proprietor.residence_id = tbl_residence.id AND tbl_residence.community_id = tbl_community.id  AND tbl_account.id = tbl_proprietor.account_id AND tbl_account.user_id = tbl_user.id AND tbl_proprietor.state != 3");
        }else{
            return $this->fetchAll( "SELECT tbl_proprietor.id,tbl_account.login_name,tbl_community.community_name, tbl_community.address, tbl_residence.building, tbl_residence.floor, tbl_residence.number, tbl_user.user_name,tbl_user.avaurl
                                       FROM tbl_proprietor, tbl_residence, tbl_community,tbl_user,tbl_account  
                                       WHERE tbl_proprietor.residence_id = tbl_residence.id AND tbl_residence.community_id = tbl_community.id AND tbl_community.id=$community_id AND tbl_proprietor.state = $state AND tbl_account.id = tbl_proprietor.account_id AND tbl_account.user_id = tbl_user.id");
        }
    }

    public function auth($proprietor_id)
    {
        $authority_id = $this->addItemToAuth($proprietor_id);

        $this->exec("UPDATE tbl_proprietor SET state = 0 WHERE id = '$proprietor_id'");

        if(!count($authority_id)) {
            return -1;
        }
        $guest_id = $this->getAccountId($proprietor_id);
        $account_id = $guest_id;
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $state = 0;
        $mode = 0;
        $data=['authority_id'=>$authority_id,'guest_id'=>$guest_id ,'account_id'=>$account_id ,'state'=>$state ,'mode'=>$mode,'create_time'=>$create_time ];

        if($this->exec("INSERT INTO `tbl_authority_user`(authority_id,guest_id,proprietor_id,state,mode,create_time) VALUES (:authority_id,:guest_id,:account_id,:state,:mode,:create_time)",$data))
        {
            $authority_user_id = $this->fetchAll("SELECT id FROM `tbl_authority_user` WHERE `authority_id` = '$authority_id' AND `create_time` = '$create_time' AND proprietor_id = $account_id");
            $authority_user_id = $authority_user_id[0]["id"];
        }else{
            return -1;
        }


        return $this->exec("UPDATE tbl_proprietor SET authority_user_id = $authority_user_id WHERE id=$proprietor_id");
    }

    public function addItemToAuth($proprietor_id) //将信息添加到用户信息列表
    {
        date_default_timezone_set('PRC');
        $community_id = $this->getCommunityId($proprietor_id);
        $dynamic_code = date("YmdHis");
        $times = 999;

        $data=['community_id'=>$community_id,'dynamic_code'=>$dynamic_code, 'times'=>$times];
      
        if($this->exec("INSERT INTO `tbl_authority`(community_id,dynamic_code,times) VALUES (:community_id,:dynamic_code,:times)",$data)){
            $auth_id = $this->fetchAll("SELECT id FROM `tbl_authority` WHERE `community_id` = '$community_id' AND `dynamic_code` = '$dynamic_code'");
            return $auth_id[0]['id'];
        }
        else{
            return -1;
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

    public function getAuthId($AuthUserId)
    {
        $data = $this->fetchAll("SELECT authority_id FROM tbl_authority_user WHERE id = $AuthUserId");
        return $data[0]['authority_id'];
    }

    public function getAuthUserId($proprietor_id)
    {
        $data = $this->fetchAll("SELECT authority_user_id FROM tbl_proprietor WHERE id = $proprietor_id");
        return $data[0]['authority_user_id'];
    }

    public function deleteAuth($auth_id)
    {
        $authority_user_id = $this->getAuthUserId($auth_id);
        $data=['authority_user_id'=>$authority_user_id,'state'=>1  ];
        return $this->exec("UPDATE tbl_authority_user SET state = :state WHERE id=:authority_user_id;",$data);
    }

    public function deleteData($proprietor_id)
    {
        $AuthUserId = $this->getAuthUserId($proprietor_id);
        $AuthId = $this->getAuthId($AuthUserId);

        $this->deleteAuth($AuthId);
        return $this->exec("UPDATE tbl_proprietor SET state = 3 WHERE id=$proprietor_id");
    }

    public function search($community_id,$key)
    {
        return $this->fetchAll( "SELECT tbl_proprietor.id,tbl_account.login_name,tbl_community.community_name, tbl_community.address, tbl_residence.building, tbl_residence.floor, tbl_residence.number, tbl_user.user_name
                                       FROM tbl_proprietor, tbl_residence, tbl_community,tbl_user,tbl_account 
                                       WHERE tbl_proprietor.residence_id = tbl_residence.id AND tbl_residence.community_id = tbl_community.id AND tbl_community.id=$community_id  AND tbl_account.id = tbl_proprietor.account_id AND tbl_account.user_id = tbl_user.id
                                       AND (tbl_residence.building LIKE '%$key%' OR tbl_residence.floor LIKE '%$key%' OR tbl_residence.number LIKE '%$key%' OR tbl_user.user_name  LIKE '%$key%' OR tbl_account.login_name LIKE '%$key%')");
    }

}