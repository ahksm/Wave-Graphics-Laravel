<!DOCTYPE html>
<html lang="en" class="h-100">

<head>
    <!-- Required Meta Tags Always Come First -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Title -->
    <title>Sign In | OculusGuard</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../favicon.ico" />

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap"
        rel="stylesheet" />

    <!-- CSS Implementing Plugins -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/bootstrap-icons/font/bootstrap-icons.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/tom-select/dist/css/tom-select.bootstrap5.css') }}" />

    <!-- CSS OculusGuard Template -->

    <link rel="preload" href="{{ asset('assets/css/theme.min.css') }}" data-hs-appearance="default" as="style" />

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600&amp;subset=cyrillic" rel="stylesheet"
        id="wt-sky-css--725574360" />
    <link rel="stylesheet" href="{{ asset('assets/css/theme.min.css') }}" data-hs-current-theme="stylesheet" />
</head>

<body class="h-100 bg-dark bg-img-center"
    style="
            background-image: url(../assets/i/andrew-kliatskyi-Cc0VTXEkdxw-unsplash.jpg);
        "
    monica-version="1.6.1" monica-id="ofpnmcalabcbjgholdjcjblkibolbppb">


    {{ $slot }}


    <!-- JS Global Compulsory  -->
    <script src="{{ asset('assets/vendor/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/jquery-migrate/dist/jquery-migrate.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>

    <!-- JS Implementing Plugins -->
    <script src="{{ asset('assets/js/hs.theme-appearance.js') }}"></script>
    <script src="{{ asset('assets/vendor/hs-toggle-password/dist/js/hs-toggle-password.js') }}"></script>

    <!-- JS OculusGuard -->
    <script src="{{ asset('assets/js/theme.min.js') }}"></script>

    <!-- JS Plugins Init. -->
    <script>
        (function() {
            window.onload = function() {
                // INITIALIZATION OF TOGGLE PASSWORD
                // =======================================================
                new HSTogglePassword(".js-toggle-password");
            };
        })();
    </script>
</body>

</html>
