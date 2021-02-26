<?php

require './steam/openid.php';

$steamauth['apikey'] = "710D88832D5DEA1D3364AC29E8D741F4";
// $steamauth['domainname'] = "skin-win.ru";
// $steamauth['loginpage'] = "https://skin-win.ru/";
// $steamauth['reg_page'] = "https://skin-win.ru/steam";
$steamauth['domainname'] = "localhost";
$steamauth['loginpage'] = "http://localhost/SkinWin/html";
$steamauth['reg_page'] = "http://localhost:3000/steam";


$openid = new LightOpenID($steamauth['domainname']);
		
if(!$openid->mode) 
{

    $openid->identity = 'https://steamcommunity.com/openid';
    header('Location: ' . $openid->authUrl());

} elseif ($openid->mode == 'cancel') 
{
    echo 'User has canceled authentication!';

} else 
{
    
    if($openid->validate()) { 

        $id = $openid->identity;
        $ptn = "/^https?:\/\/steamcommunity\.com\/openid\/id\/(7[0-9]{15,25}+)$/";
        preg_match($ptn, $id, $matches);

        $params = array(
            'steam_id' => $matches[1], 
        );

        function httpPost($url,$data){
            $curl = curl_init($url);
            curl_setopt($curl,CURLOPT_POST,true);
            curl_setopt($curl,CURLOPT_POSTFIELDS,http_build_query($data));
            curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
            $response=curl_exec($curl);
            curl_close($curl);
            return $response;
        }

        $result = httpPost($steamauth['reg_page'], $params);
        $obj = json_decode($result);

        setcookie("token", $obj->{'token'}, time()+3600*24, '/');
        header('Location: ' . $steamauth['loginpage']);
    } else {
        echo "User is not logged in.\n";
    }
}