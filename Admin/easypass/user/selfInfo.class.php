<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/7
 * Time: 14:47
 */


namespace user;

class selfInfo extends \MySQLPDO
{
    public function login($code)
    {
        $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4944c6ebc30b710b&secret=12d6ce3ab9d6cb539d7b4f655e5d5e20&js_code=' . $code . '&grant_type=authorization_code'; //yourAppid为开发者appid.appSecret为开发者的appsecret,都可以从微信公众平台获取；
        $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
        $json = json_decode($info);//对json数据解码
        $arr = get_object_vars($json);
        $openid = $arr['openid'];

        $data = $this->fetchAll("SELECT tbl_account.id,tbl_account.user_id,tbl_account.role_id FROM tbl_account WHERE password LIKE '$openid' AND role_id = 4");
        return $data;
    }

    public function register($code, $nick, $imgUrl, $sex){
        $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4944c6ebc30b710b&secret=12d6ce3ab9d6cb539d7b4f655e5d5e20&js_code=' . $code . '&grant_type=authorization_code'; //yourAppid为开发者appid.appSecret为开发者的appsecret,都可以从微信公众平台获取；
        $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
        $json = json_decode($info);//对json数据解码
        $arr = get_object_vars($json);
        $password = $arr['openid'];

        $data = $this->fetchAll("SELECT tbl_account.id,tbl_account.user_id,tbl_account.role_id FROM tbl_account WHERE password LIKE '$password' AND role_id = 4");

        if(!count($data)){
            date_default_timezone_set('PRC');
            $create_time = date("Y-m-d H:i:s");
            $login_name = date("YmdHis");
            $role_id=4;

            $user_id = $this->addItemToUser($nick,$imgUrl,$sex);
            if($user_id!=-1){

                $data=['login_name'=>$login_name,'password'=>$password,'user_id'=>$user_id,'role_id'=>$role_id,'create_time'=>$create_time];
                if($this->exec("INSERT INTO `tbl_account`(login_name, password, user_id, role_id,create_time) VALUES (:login_name,:password,:user_id,:role_id,:create_time)",$data)){
                    $account_id = $this->fetchAll("SELECT id FROM `tbl_account` WHERE `login_name` LIKE $login_name");
                    return $account_id[0]['id'];
                }
                else{
                    return -1;
                }
            }
            else{
                return -1;
            }
        }else{
            $arr=['user_name'=>$nick,'avaurl'=>$imgUrl, 'sex'=>$sex, 'id'=>$data[0]['user_id']];
            $this->exec("UPDATE `tbl_user` SET user_name = :user_name,avaurl=:avaurl, sex=:sex WHERE id=:id",$arr);
            return $data[0]['id'];
        }


    }

    public function addItemToUser($nick,$imgUrl,$sex) //将信息添加到用户信息列表
    {

        $data=['user_name'=>$nick,'avaurl'=>$imgUrl, 'sex'=>$sex];
        if($this->exec("INSERT INTO `tbl_user`(user_name,avaurl, sex) VALUES (:user_name,:avaurl,:sex)",$data)){
            $user_id = $this->fetchAll("SELECT id FROM `tbl_user` WHERE `user_name` = '$nick' AND `avaurl` = '$imgUrl'");
            return $user_id[0]['id'];
        }
        else{
            return -1;
        }

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

}