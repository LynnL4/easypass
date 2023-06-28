<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/13
 * Time: 14:26
 */

namespace guard;


class guard extends \MySQLPDO
{

    public function getList($community_id)
    {
        return $this->fetchAll("SELECT id FROM tbl_guard WHERE community_id = $community_id AND state = 0 ");
    }

    public function getDetail($guard_id){
        return $this->fetchAll("SELECT * FROM tbl_guard WHERE id = $guard_id AND state = 0 ");
    }

    public function vaild($auth_id,$guard_id,$community_id,$dynamic_code)
    {
        date_default_timezone_set('PRC');
        $res = $this->fetchAll("SELECT * FROM tbl_authority WHERE id = $auth_id ");


        if(!count($res)){
            $this->record($auth_id, $guard_id, "未找到授权信息", 1);
            return -1;
        }else {
            $mode = $this->fetchAll("SELECT * FROM tbl_authority_user WHERE authority_id =  $auth_id");
            $time1 = $res[0]['time_vaild'];
            $time2 = date("Y-m-d H:i:s");
            if($this->date2time($time2) - $this->date2time($time1) > 60){
                $this->record($auth_id, $guard_id, "授权信息超时", 1);
                return -2;
            }else{
                if($res[0]['community_id'] != $community_id){
                    $this->record($auth_id, $guard_id, "门禁卡信息错误,不是对应小区门禁卡", 1);
                    return -3;
                }else{
                    if($res[0]['times'] == 0 && $mode[0]["mode"]){
                        $this->record($auth_id, $guard_id, "门禁卡已失效，次数为零", 1);
                        return -4;
                    }else{
                        if(($this->date2time($time2) < $this->date2time($res[0]['time_limit_start'])) || ($this->date2time($time2) > $this->date2time($res[0]['time_limit_end'])) && $mode[0]["mode"]){
                            $this->record($auth_id, $guard_id, "不在允许的时间段内访问", 1);
                            return -5;
                        }else{
                            if($dynamic_code != sha1($res[0]['dynamic_code'])){
                                $this->record($auth_id, $guard_id, "二维码错误", 1);
                                return -6;
                            }else{
                                $this->timesLeft($auth_id, $res[0]['times']);
                                $this->record($auth_id, $guard_id, "访问成功", 0);
                                return 0;
                            }
                        }
                    }
                }
            }
        }
    }

    function timesLeft($auth_id,$times)
    {
        $res = $this->fetchAll("SELECT * FROM tbl_authority_user WHERE authority_id =  $auth_id");
        if($res[0]["mode"] != 0){
            $times -= 1;
            if($times == 0){
                $this->deleteAuth($auth_id);
            }else{
                $this->updateAuth($auth_id,$times);
            }
        }
    }

    public  function getAuthUserId($auth_id)
    {
        $res = $this->fetchAll("SELECT * FROM tbl_authority_user WHERE authority_id =  $auth_id");
        return $res[0]["id"];
    }

    public function updateState($authority_id)
    {
        $data=['authority_id'=>$authority_id,'state'=>0  ];

        if($this->exec("UPDATE tbl_authority SET state = :state WHERE id=:authority_id;",$data))
        {
            return 0;
        }else{
            return -1;
        }
    }

    public function updateAuth($authority_id,$times)
    {
        $data=['authority_id'=>$authority_id,'times'=>$times  ];

        if($this->exec("UPDATE tbl_authority SET times = :times WHERE id=:authority_id;",$data))
        {
            return 0;
        }else{
            return -1;
        }
    }

    public function deleteAuth($auth_id)
    {
        $authority_user_id = $this->getAuthUserId($auth_id);
        $data=['authority_user_id'=>$authority_user_id,'state'=>1  ];
        return $this->exec("UPDATE tbl_authority_user SET state = :state WHERE id=:authority_user_id;",$data);
    }

    function record($auth_id, $guard_id, $description, $state)
    {
        date_default_timezone_set('PRC');
        $record_time = date("Y-m-d H:i:s");
        $res = $this->fetchAll("SELECT * FROM tbl_authority_user WHERE authority_id = '$auth_id'");
        if($res[0]["mode"] == 0) {
            $mode = 0;
        }else{
            $mode = 1;
        }

        $data=['auth_id'=>$auth_id,'guard_id'=>$guard_id, 'description'=>$description,'mode'=>$mode,'state'=>$state,'record_time'=>$record_time];

        $this->updateState($auth_id);
        return $this->exec("INSERT INTO `tbl_record`(auth_id,guard_id, description, mode,state, record_time) VALUES (:auth_id,:guard_id,:description,:mode,:state,:record_time)",$data);
    }

    function date2time($d){
        $year=((int)substr("$d",0,4));  //取得年份
        $month=((int)substr("$d",5,2)); //取得月份
        $day=((int)substr("$d",8,2));   //取得几号
        $hour = ((int)substr("$d",11,2));   //取得几号
        $minute = ((int)substr("$d",14,2));   //取得几号
        $second = ((int)substr("$d",17,2));   //取得几号

        return mktime($hour,$minute,$second,$month,$day,$year);
    }


}