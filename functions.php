<?php

function fn_flush()
{
    if (function_exists('ob_flush')) {
        @ob_flush();
    }

    flush();
}

function fn_echo($value)
{
    if (defined('CONSOLE')) {
        $value = str_replace(['<br>', '<br />', '<br/>'], "\n", $value);
        $value = strip_tags($value);
    }

    echo $value;

    fn_flush();
}

function fn_print_r()
{
    $args = func_get_args();

    fn_echo('<ol style="font-family: Courier; font-size: 12px; border: 1px solid #dedede; background-color: #efefef; float: left; padding-right: 20px;">');

    foreach ($args as $v) {
        fn_echo('<li><pre>' . htmlspecialchars(print_r($v, true)) . "\n" . '</pre></li>');
    }
    fn_echo('</ol><div style="clear:left;"></div>');
}

function fn_generate_password($length = 10)
{
    $chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $numbers = '1234567890';
    $i = 0;
    $password = '';

    while ($i < $length) {
        if ($i % 2) {
            $password .= $chars[mt_rand(0, strlen($chars) - 1)];
        } else {
            $password .= $numbers[mt_rand(0, strlen($numbers) - 1)];
        }
        ++$i;
    }

    return $password;
}
