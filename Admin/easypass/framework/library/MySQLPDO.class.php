<?php
    //基于PDO扩展的MySQL数据库操作类

    class MySQLPDO{
        protected static $db = null;    //保存PDO实例
        public function __construct(){
            self::$db ||self::__connect();
        }
        private function __clone(){}
        private static function __connect()
        {
            $config = C('DB_CONFIG');
            $dsn = "{$config['db']}:host={$config['host']};port={$config['port']};
            dbname={$config['dbname']};charset={$config['charset']}";
            try {
                self::$db = new PDO($dsn, $config['user'], $config['pass']);
            } catch (PDOException $e) {
                exit('数据库连接失败:' . $e->getMessage());
            }

        }

        public function query($sql,$data=[]){
            $stmt = self::$db->prepare($sql);
            is_array(current($data)) || $data = [$data];
            foreach ($data as $v){
                if(false === $stmt->execute($v)){
                    exit('数据库操作失败:'.implode('-',$stmt->errorInfo()));
                }
            }
            return $stmt;
        }
        public function exec($sql,$data=[]){
            return $this->query($sql,$data)->rowCount();
        }
        public function fetchAll($sql,$data=[]){
            return $this->query($sql,$data)->fetchAll(PDO::FETCH_ASSOC);
        }
        public function fetchRow($sql,$data=[]){
            return $this->query($sql,$data)->fetch(PDO::FETCH_ASSOC);
        }
        public function fetchColumn($sql,$data=[]){
            return $this->query($sql,$data)->fetchColumn();
        }
        public function lastInsertId(){
            return self::lastInsertId();
        }

    }