<?php
    class Controller{
        private $_data =[];
        private $_tips= '';
        public function __construct()
        {
            //自动进行令牌验证
            if((IS_POST || isset($_GET['exec'])) && !token_check()){
                E('操作失败：令牌错误，清除Cookie后重试。');
            }
        }

        //方法不存在时报错退出
        public function __call($name,$args){
            E('你访问的操作不存在！');
        }
        //重定向
        protected function redirect($url){
            header("Location:$url");
            exit;
        }
        //取出模板变量
        public function __get($name)
        {
            return isset($this->_data[$name]) ? $this->_data[$name] : null;
        }
        //赋值模板变量
        public function __set($name, $value)
        {
            $this->_data[$name] = $value;
        }
        //显示视图
        protected function display()
        {
            extract($this->_data);
            $this->_data = [];
            //require XX;
            exit;
        }
        //提示信息
        protected function tips($flag=false,$tips=''){
            $this->_tips =$tips ? ($flag ? "<div>$tips</div>":
            "<div class=\"error\">$tips</div>"):'';
        }
    }