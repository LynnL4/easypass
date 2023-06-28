<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/2
 * Time: 14:30
 */

namespace area;


class selfInfo extends \MySQLPDO
{
    public function login($login_name, $password)
    {

        return $this->fetchAll("SELECT tbl_account.id,tbl_account.user_id,tbl_account.role_id, tbl_community_admin.community_id, tbl_community.area_id 
                                     FROM tbl_account, tbl_community_admin,tbl_community
                                     WHERE login_name LIKE '$login_name' AND password LIKE '$password' AND role_id = 3 AND tbl_account.id=tbl_community_admin.account_id AND tbl_community_admin.community_id = tbl_community.id");
    }

    public function changePwd($login_name, $old_password, $new_password)
    {
        $data = $this->login($login_name, $old_password);
        $id  = $data[0]['id'];
        if($id ){
             $this->exec("UPDATE `tbl_account` SET `password`=$new_password WHERE id= '$id'");
             return 0;
        }else{
            return -1;
        }
    }

    public function getSelfInfo($account_id){
        return $this->fetchAll("SELECT tbl_user.user_name,tbl_user.avaurl, tbl_community.community_name
                                     FROM tbl_user, tbl_account,tbl_community, tbl_community_admin
                                    WHERE tbl_account.id = $account_id AND tbl_account.user_id = tbl_user.id AND tbl_community_admin.community_id = tbl_community.id AND tbl_community_admin.account_id = tbl_account.id");
    }
}