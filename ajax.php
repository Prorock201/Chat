<?php
 header('Content-type: application/json');

 print json_encode($result = array(

     'success' => true,
     'message' =>  $_POST['name'],
     'name' => $_POST['name']
 ));
?>