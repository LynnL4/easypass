<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/2/28
 * Time: 21:28
 */

namespace su;


class role extends \MySQLPDO
{
    public function getList()
    {
        return $this->fetchAll("SELECT tbl_area_admin.id,tbl_user.user_name,tbl_account.login_name,tbl_area.prov,tbl_area.city,tbl_area.dist, tbl_area_admin.account_id
                                     FROM tbl_area_admin,tbl_account,tbl_user,tbl_area 
                                     WHERE tbl_area_admin.account_id=tbl_account.id AND tbl_area_admin.area_id=tbl_area.id AND tbl_account.user_id=tbl_user.id AND tbl_area_admin.state != 2
                                     ORDER BY tbl_area_admin.create_time DESC");
    }

    public function addAreaAdmin($area_code,$user_name,$email)
    {
        $account_id = $this->addItemToAccount($area_code,$user_name,$email);

        if($account_id!=-1){
            $area_id = $this->isAreaExist($area_code);
            date_default_timezone_set('PRC');
            $create_time = date("Y-m-d H:i:s");
            $state = 0;

            $data=['account_id'=>$account_id,'area_id'=>$area_id, 'state'=>$state, 'create_time'=>$create_time];
            if($this->exec("INSERT INTO `tbl_area_admin`(account_id,area_id,state,create_time)  VALUES (:account_id,:area_id,:state,:create_time)",$data)){
                return $this->getLoginName($account_id);
            }else
                return -1;
        }
        return -1;
    }


    public function addItemToUser($area_code,$user_name,$email) //将信息添加到用户信息列表
    {
        $area_id = $this->isAreaExist($area_code);
        if($area_id)
        {
            $avaurl = "/su/assets/img/user0".rand(1, 7).".png";
            $data=['user_name'=>$user_name,'email'=>$email, 'avaurl'=>$avaurl];
            if($this->exec("INSERT INTO `tbl_user`(user_name,email,avaurl) VALUES (:user_name,:email,:avaurl)",$data)){
                $user_id = $this->fetchAll("SELECT id FROM `tbl_user` WHERE `user_name` = '$user_name' AND `email` = '$email'");
                return $user_id[0]['id'];
            }
            else{
                return -1;
            }
        }
        return -1;
    }

    public function addItemToAccount($area_code,$user_name,$email) //将信息添加到用户信息列表
    {
        $user_id = $this->addItemToUser($area_code,$user_name,$email);
        if($user_id!=-1){
            date_default_timezone_set('PRC');
            $create_time = date("Y-m-d H:i:s");
            $login_name = date("YmdHis");
            $password="666666";
            $role_id=2;

            $data=['login_name'=>$login_name,'password'=>$password,'user_id'=>$user_id,'role_id'=>$role_id,'create_time'=>$create_time];
            if($this->exec("INSERT INTO `tbl_account`(login_name, password, user_id, role_id,create_time) VALUES (:login_name,:password,:user_id,:role_id,:create_time)",$data)){
                $account_id = $this->fetchAll("SELECT id FROM `tbl_account` WHERE `login_name` LIKE $login_name");
                return $account_id[0]['id'];
            }
            else{
                return -1;
            }

        }
        return -1;
    }


    public function getLoginName($id)
    {
        $data = $this->fetchAll("SELECT login_name FROM `tbl_account` WHERE `id`='$id'");
        if($data){
            return $data[0]['login_name'];
        }
        else
            return 0;
    }

    public function isAreaExist($area_code) //区域是否存在
    {
        $id = $this->fetchAll("SELECT id FROM `tbl_area` WHERE `area_code`='$area_code'");
        if($id){
            return $id[0]['id'];
        }
        else
            return 0;
    }

    public function deleteData($id)
    {
        return $this->exec("UPDATE `tbl_area_admin` SET `state`='2' WHERE (`id`=$id);");
    }

    public function Reset($id)
    {

        return $this->exec("UPDATE `tbl_account` SET `password`='666666' WHERE (`id`=$id);");
    }
}