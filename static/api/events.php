<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    
    $config = include("../config.php");

    $HOST = $config["dbhost"];
    $USER = $config["dbuser"];
    $DB = $config["dbname"];
    $PASSWORD = $config["dbpassword"];
    $mysqli = new mysqli($HOST, $USER, $PASSWORD, $DB);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST")
    {
        echo "Moostik";
    }
    else
    {
        $body = file_get_contents('php://input');
        $event = json_decode($body);
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
            $event->eventType,
            $event->sessionId,
            $event->referralId,
            $event->username,
            $event->company,
            $event->password,
            $event->clue,
            $event->attemptCount);
        $res = $statement->execute();
        $err = mysqli_error($mysqli);
        if ($res != 1)
        {
            echo $err;
        }
    }
?>