<?php

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_REQUEST['sequenceLength'])) {
        fn_echo(fn_generate_password($_REQUEST['sequenceLength']));
    }
}
