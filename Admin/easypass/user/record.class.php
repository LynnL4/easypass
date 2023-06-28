<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/15
 * Time: 21:20
 */

namespace user;


class record extends \MySQLPDO
{
    public function getSelfRecord($account_id)
    {
        return $this->fetchAll("SELECT tbl_record.*, tbl_user.avaurl,tbl_user.user_name,tbl_account.login_name, tbl_guard.description AS toward, tbl_community.community_name,tbl_community.address
                                     FROM tbl_record, tbl_authority,tbl_authority_user, tbl_user, tbl_account, tbl_guard, tbl_community
                                     WHERE  ((tbl_authority_user.proprietor_id = 35 AND tbl_authority_user.`mode`=0)OR (tbl_authority_user.guest_id = 35 AND tbl_authority_user.`mode` = 1)) AND tbl_authority.id = tbl_record.auth_id  AND tbl_authority_user.authority_id = tbl_record.auth_id AND tbl_authority_user.state = 0 
                                     AND tbl_account.id=tbl_authority_user.guest_id AND tbl_user.id = tbl_account.user_id AND tbl_guard.id = tbl_record.guard_id AND  tbl_community.id = tbl_authority.community_id ORDER BY tbl_record.id DESC;");
    }

    public function getGuestRecord($account_id)
    {
        return $this->fetchAll("SELECT tbl_record.*, tbl_user.avaurl,tbl_user.user_name,tbl_account.login_name, tbl_guard.description AS toward, tbl_community.community_name,tbl_community.address
                                      FROM tbl_record, tbl_authority,tbl_authority_user, tbl_user, tbl_account, tbl_guard,tbl_community
                                      WHERE tbl_authority_user.proprietor_id = $account_id AND tbl_record.mode=1 AND tbl_authority.id = tbl_record.auth_id  AND tbl_authority_user.authority_id = tbl_record.auth_id AND tbl_authority_user.state = 0 
                                      AND tbl_account.id=tbl_authority_user.guest_id AND tbl_user.id = tbl_account.user_id AND tbl_guard.id = tbl_record.guard_id AND  tbl_community.id = tbl_authority.community_id ORDER BY tbl_record.id DESC;");
    }
}