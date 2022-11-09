<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    $config = include("../config.php");

    $DBHOST = $config["dbhost"];
    $DBUSER = $config["dbuser"];
    $DBNAME = $config["dbname"];
    $DBPASSWORD = $config["dbpassword"];

    $USER = $config["user"];
    $PASSWORD = $config["password"];

    $mysqli = new mysqli($DBHOST, $DBUSER, $DBPASSWORD, $DBNAME);
    
    if ($_SERVER["REQUEST_METHOD"] != "POST")
    {
        $auth = get_headers()["authorization"];
        if ($auth == NULL)
        {
            http_response_code(401);
            echo "Invalid username or password";
            return;
        }
        $elts = explode(" ", $auth, 3);
        $receivedUser = $elts[1];
        $receivedPassword = $elts[2];
        if ($USER != $receivedUser || $PASSWORD != $receivedPassword)
        {
            http_response_code(401);
            echo "Invalid username or password";
            return;
        }
        echo '"Cool"';
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
            Name,
            Company,
            Password,
            Clue,
            AttemptCount,
            SecurityQuestion,
            SecurityAnswer
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
        $statement->bind_param("sssssssssiss",
            $event->sentDateTime, 
            $event->eventType,
            $event->sessionId,
            $event->referralId,
            $event->username,
            $event->name,
            $event->company,
            $event->password,
            $event->clue,
            $event->attemptCount,
            $event->securityQuestion,
            $event->securityAnswer);
        $res = $statement->execute();
        $err = mysqli_error($mysqli);
        if ($res != 1)
        {
            echo $err;
        }
    }
?>