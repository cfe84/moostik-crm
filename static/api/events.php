<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    
    $config = include("../config.php");

    $HOST = $config->dbhost;
    $USER = $config->dbuser;
    $DB = $config->dbname;
    $PASSWORD = $config->dbpassword;

    if ($_SERVER["REQUEST_METHOD"] != "POST")
    {
        echo "Moostik";
    }
    else
    {
        $body = file_get_contents('php://input');
        $event = json_decode($body);
        $mysqli = new mysqli($HOST, $USER, $PASSWORD, $DB);
        $statement = $mysqli->prepare("INSERT INTO events (
            SentDateTime, 
            EventType,
            SessionId,
            ReferralId,
            Username,
            Company,
            Password,
            Clue,
            AttemptCount
        ) VALUES (?,?,?,?,?,?,?,?,?)");
        $statement->bind_param("ssssssssi",
            $event->sentDateTime, 
            $event->eventTame,
            $event->sessionId,
            $event->referralId,
            $event->username,
            $event->company,
            $event->password,
            $event->clue,
            $event->attemptCount);
        $res = $statement->execute();
        // $err = mysqli_error($mysqli);
        // if ($res != 1)
        // {
        //     $error_stmt = $mysqli->prepare("INSERT INTO errors (date, error, body) VALUES (CURDATE(),?,?)");
        //     $error_stmt->bind_param("ss", $err, $body);
        //     $error_stmt->execute();
        // }
    }
?>