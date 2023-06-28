<?php

  $fp = popen('top -b -n 1 | grep -E "^()"',"r");//获取某一时刻系统cpu和内存使用情况
  $rs = "";
  while(!feof($fp)){
   $rs .= fread($fp,1024);
  }
 
  pclose($fp);
  $sys_info = explode("\n",$rs);
           
  //echo $sys_info[3];

  $tast_info = explode(",",$sys_info[1]);//进程 数组
  $cpu_info = explode(",",$sys_info[2]);  //CPU占有量  数组
  $mem_info = explode(",",$sys_info[3]); //内存占有量 数组

  $cpu_usage = trim(trim($cpu_info[0],'Cpu(s): '),'%us');  //百分比
  $cpu_usage =explode(":",$cpu_usage);  
  //echo $cpu_usage[1];	
  $mem_total = explode(":",trim(trim($mem_info[0],'Mem: '),'k total'))[1];
  $mem_used = trim(trim($mem_info[1],'k used'), ' fr');
  $mem_usage = round(100*intval($mem_used)/intval($mem_total),2);  //百分比
  //echo $mem_usage;

   /*硬盘使用率 begin*/
  $fp = popen('df -lh | grep -E "^(/)"',"r");
  $rs = fread($fp,1024);
  pclose($fp);
  $rs = preg_replace("/\s{2,}/",' ',$rs);  //把多个空格换成 “_”
  $hd = explode(" ",$rs);
  $hd_avail = trim($hd[3],'G'); //磁盘可用空间大小 单位G
  $hd_usage = trim($hd[4],'%'); //挂载点 百分比
  /*硬盘使用率 end*/

  $res = array(
    'cpu' =>  $cpu_usage[1],
    'memory' => $mem_usage,
    'disk' => $hd_usage
  );
  
 echo json_encode($res);
?>
