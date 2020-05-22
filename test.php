<?php
  $page = "mrmauiman.github.io"
  $name = $_POST["name"];
  $desc = $_POST["desc"];

  $to = "mlkelley@mail.roanoke.edu";
  $subject = "Test";
  $txt = "Hello world! $name, $desc";
  $headers = "From: mouster54@gmail.com";

  mail($to,$subject,$txt,$headers);

  header("Location: $page");
  exit;
?>
