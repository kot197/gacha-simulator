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
        //$pdo = require 'connect.php';
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
                    <button id="warp_x1" class="btn">Warp x1</button>
                    <button id="warp_x10" class="btn">Warp x10</button>
                </div>
            </div>
        </div>
    </header>
    <section id="warp-records">
        <h1>Warp Records</h3>
        <div class="flex">
            <h5>UID: <span id="uid">xxxx</span></h5>
        </div>
        <div id="warp-items-wrapper" class="container flex">
            <div id="total-warps" class="warp-records-info">
                <h4>145</h4>
                <img src="assets/Item_Star_Rail_Special_Pass.webp" alt="Icon" width="40" height="40">
            </div>
            <div id="total-stellar-jade" class="warp-records-info">
                <h4>20000</h4>
                <img src="assets/Item_Stellar_Jade.webp" alt="Icon" width="40" height="40">
            </div>
        </div>
        <div id="pagination-control">
            <button id="prev-page">< Prev</button>
            <span id="page-numbers">1 / 6 </span>
            <button id="next-page">Next ></button>
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