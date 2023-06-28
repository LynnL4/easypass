<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/14
 * Time: 20:31
 */

namespace guard;


class record extends \MySQLPDO
{
    public function getList($guard_id, $mode, $state, $start, $end){

        if($mode == 2 && $state == 2)
        {
            return $this->fetchAll("SELECT tbl_record.*, tbl_user.avaurl,tbl_user.user_name,tbl_account.login_name,tbl_authority_user.id AS authority_user_id, tbl_guard.description AS toward
                                      FROM tbl_record, tbl_authority,tbl_authority_user, tbl_user, tbl_account, tbl_guard
                                      WHERE (unix_timestamp(tbl_record.record_time) between unix_timestamp( '$start') and unix_timestamp( '$end' )) AND tbl_record.guard_id = $guard_id AND tbl_authority.id = tbl_record.auth_id  AND tbl_authority_user.authority_id = tbl_record.auth_id AND tbl_authority_user.state = 0 
                                      AND tbl_account.id=tbl_authority_user.guest_id AND tbl_user.id = tbl_account.user_id AND tbl_guard.id = tbl_record.guard_id
                                      ORDER BY tbl_record.id DESC ;");
        } else if($mode == 2){
            return $this->fetchAll("SELECT tbl_record.*, tbl_user.avaurl,tbl_user.user_name,tbl_account.login_name,tbl_authority_user.id AS authority_user_id, tbl_guard.description AS toward
                                      FROM tbl_record, tbl_authority,tbl_authority_user, tbl_user, tbl_account, tbl_guard
                                      WHERE (unix_timestamp(tbl_record.record_time) between unix_timestamp( '$start') and unix_timestamp( '$end' )) AND tbl_record.state = $state AND tbl_record.guard_id = $guard_id AND tbl_authority.id = tbl_record.auth_id  AND tbl_authority_user.authority_id = tbl_record.auth_id AND tbl_authority_user.state = 0 
                                      AND tbl_account.id=tbl_authority_user.guest_id AND tbl_user.id = tbl_account.user_id AND tbl_guard.id = tbl_record.guard_id
                                      ORDER BY tbl_record.id DESC;");
        }else if($state == 2)
        {
            return $this->fetchAll("SELECT tbl_record.*, tbl_user.avaurl,tbl_user.user_name,tbl_account.login_name,tbl_authority_user.id AS authority_user_id, tbl_guard.description AS toward
                                      FROM tbl_record, tbl_authority,tbl_authority_user, tbl_user, tbl_account, tbl_guard
                                      WHERE (unix_timestamp(tbl_record.record_time) between unix_timestamp( '$start') and unix_timestamp( '$end' )) AND tbl_record.guard_id = $guard_id AND tbl_record.mode=$mode AND tbl_authority.id = tbl_record.auth_id  AND tbl_authority_user.authority_id = tbl_record.auth_id AND tbl_authority_user.state = 0 
                                      AND tbl_account.id=tbl_authority_user.guest_id AND tbl_user.id = tbl_account.user_id AND tbl_guard.id = tbl_record.guard_id
                                      ORDER BY tbl_record.id DESC;");
        }else{
            return $this->fetchAll("SELECT tbl_record.*, tbl_user.avaurl,tbl_user.user_name,tbl_account.login_name,tbl_authority_user.id AS authority_user_id, tbl_guard.description AS toward
                                      FROM tbl_record, tbl_authority,tbl_authority_user, tbl_user, tbl_account, tbl_guard
                                      WHERE (unix_timestamp(tbl_record.record_time) between unix_timestamp( '$start') and unix_timestamp( '$end' )) AND tbl_record.state = $state AND tbl_record.guard_id = $guard_id AND tbl_record.mode=$mode AND tbl_authority.id = tbl_record.auth_id  AND tbl_authority_user.authority_id = tbl_record.auth_id AND tbl_authority_user.state = 0 
                                      AND tbl_account.id=tbl_authority_user.guest_id AND tbl_user.id = tbl_account.user_id AND tbl_guard.id = tbl_record.guard_id
                                      ORDER BY tbl_record.id DESC;");
        }


    }
}