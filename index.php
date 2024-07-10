<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warp Simulator</title>
    <!-- font awesome cdn -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- fonts -->
    <link rel = "stylesheet" href = "font/fonts.css">
    <!-- normalize css -->
    <link rel = "stylesheet" href = "css/normalize.css">
    <!-- custom css -->
    <link rel = "stylesheet" href = "css/utility.css">
    <link rel = "stylesheet" href = "css/style.css">
    <link rel = "stylesheet" href = "css/responsive.css">
</head>
<body>
    <?php
        $pdo = require 'connect.php';
    ?>
    <!-- navbar -->
    <nav class="navbar">
        <div class="container flex">
            <a href="index.html" class="site-logo">
                Kot's<br><span>Honkai: Warp Simulator</span>
            </a>
        </div>
    </nav>

    <header>
        <div id="video-wrapper" class="video-wrapper flex">
            <video id="video" autoplay loop muted>
                <source src="assets/main-screen.mp4" type="video/mp4">
            </video>
            <div id="header-wrapper" class="header-wrapper">
                <div class="header-title">
                    <h1>Feeling lucky? Try your luck with warp simulator!</h1>
                </div>
                <div class="header-item">
                    <a href="#!" id="start-btn" class="btn">Start Warping</a>
                </div>
            </div>
        </div>
        <div id="banners" class="flex hide">
            <div class="banner-container flex">
                <div id="limited-banner" class="banner">
                    <h3>Limited Banner: Firefly</h3>
                </div>
            </div>
            <div class="banner-container flex">
                <div id="standard-banner" class="banner">
                    <h3>Standard Banner</h3>
                </div>
            </div>
            <div id="warp-wrapper">
                <div class="warps center-absolute">
                    <button class="btn">Warp x1</button>
                    <button class="btn">Warp x10</button>
                </div>
            </div>
        </div>
    </header>
    <section id="warp-records">
        <h1>Warp Records</h3>
        <h5>UID: <span id="uid">xxxx</span></h5>
        <div class="container flex">
            <div class="warp-item flex">
                <img src="assets/Character/Character_Yanqing_Icon.webp">
                <h4>Yanqing</h4>
            </div>
        </div>
    </section>
    <footer>
        <div class="container">
            <p class="sm-title">email me at <span>kot_d@gmail.com</span></p>
        </div>
    </footer>
    <!-- js -->
    <script src = "js/script.js"></script>
</body>
</html>