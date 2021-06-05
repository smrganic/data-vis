<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./dist/style.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins" />
  <title>Eurovision Song Contest Winners</title>
</head>

<body>
  <div class="flex-div">
    <div class="flex-child" id="container">
    </div>
    <div class="flex-child" id="videoContainer" style="height: 100%;">
      <iframe id="videoFrame" style="visibility: hidden" title="YouTube video player" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
      <button id="close-btn" style="position: absolute; top: 10%; right: 5%; visibility: hidden">
        Close Video Player
      </button>
    </div>
  </div>
  <script src="./dist/bundle.js"></script>
</body>

</html>