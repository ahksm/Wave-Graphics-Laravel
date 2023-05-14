<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required Meta Tags Always Come First -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Title -->
    <title>Generate Graphic Set | OculusGuard</title>

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
    <style>
        .myCanvas {
            display: none;
        }

        #main-container {
            position: relative;
        }

        .loader {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translateX(-20px);
            z-index: 9999;
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(5px);
            display: none;
        }

        .loader:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-top: 3px solid #333;
            border-right: 3px solid transparent;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body class="bg-light" monica-version="1.6.0" monica-id="ofpnmcalabcbjgholdjcjblkibolbppb">
    <!-- ========== MAIN CONTENT ========== -->
    <main id="content" role="main" class="main">
        <!-- Header -->
        <div class="bg-dark">
            <div class="container py-lg-3">
                <!-- Page Header -->
                <div class="page-header page-header-light page-header-reset navbar-expand-lg mb-0">
                    <div class="navbar-nav">
                        <div class="row align-items-center flex-grow-1">
                            <div class="col">
                                <!-- Logo -->
                                <a class="navbar-brand" href="/" aria-label="OculusGuard">
                                    <img class="navbar-brand-logo-short d-lg-none"
                                        src="../assets/i/oculusguard-emblem-light.png" alt="OculusGuard Logo" />
                                    <img class="navbar-brand-logo d-none d-lg-block"
                                        src="../assets/i/oculusguard-light.svg" alt="OculusGuard Logo" />
                                </a>
                                <!-- End Logo -->
                            </div>

                            <div class="col-auto">
                                <!-- Navbar -->
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <!-- Account -->
                                        <div class="dropdown">
                                            <a class="navbar-dropdown-account-wrapper" href="javascript:;"
                                                id="accountNavbarDropdown" data-bs-toggle="dropdown"
                                                aria-expanded="false" data-bs-auto-close="outside"
                                                data-bs-dropdown-animation="">
                                                <div class="avatar avatar-sm avatar-circle bg-transparent">
                                                    <img class="avatar-img"
                                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                                                        alt="Image Description" />
                                                </div>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account"
                                                aria-labelledby="accountNavbarDropdown" style="width: 16rem">
                                                <div class="dropdown-item-text">
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar avatar-circle bg-transparent">
                                                            <img class="avatar-img"
                                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                                                                alt="Image Description" />
                                                        </div>
                                                        <div class="flex-grow-1 ms-3">
                                                            <h5 class="mb-0">
                                                                {{ Auth::user()->name }}
                                                            </h5>
                                                            <p class="card-text text-muted">
                                                                {{ Auth::user()->email }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dropdown-divider"></div>
                                                {{-- <a class="dropdown-item" href="#">Profile &amp;
                                                    account</a>
                                                <a class="dropdown-item" href="#">Settings</a> --}}
                                                {{-- <div class="dropdown-divider"></div> --}}
                                                <form action="/logout" method="POST">
                                                    @csrf
                                                    <button class="dropdown-item" type="submit" name="logout">Sign
                                                        out</button>
                                                </form>
                                            </div>
                                        </div>
                                        <!-- End Account -->
                                    </li>
                                </ul>
                                <!-- End Navbar -->
                            </div>
                        </div>
                        <!-- End Row -->
                    </div>
                </div>
                <!-- End Page Header -->
            </div>

            <hr class="opacity-10 my-0" />

            <div class="container pt-6 pb-10">
                <h1 class="text-white">Generate Graphic Set</h1>
            </div>
        </div>
        <!-- End Header -->

        <!-- Content -->
        <div class="content container mb-4" style="margin-top: -4.5rem">
            <!-- Card -->
            <div class="card overflow-hidden border-0 mb-3 mb-lg-5">
                <div class="card-body p-4 p-lg-10">
                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Graphic Set Name</label>
                        <div class="col-lg-6">
                            <input id="canvas-name" type="text"
                                class="form-control form-control-lg form-control-solid"
                                placeholder="Enter a Graphic Set Name" />
                        </div>
                    </div>

                    <div class="row mb-4">
                        <label class="col-lg-3 fw-medium mb-2 mb-lg-0">Size</label>
                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-6 mb-4 mb-lg-0">
                                    <label class="form-label text-muted">Width
                                        <span class="text-muted">(px)</span></label>
                                    <div class="input-group mb-3">
                                        <input id="canvas-width" min="10" step="10" type="number"
                                            class="form-control form-control-lg form-control-solid" value="300" />
                                        <span class="input-group-text">px</span>
                                    </div>
                                </div>

                                <div class="col-lg-6 mb-4 mb-lg-0">
                                    <label class="form-label text-muted">Height
                                        <span class="text-muted">(px)</span></label>
                                    <div class="input-group mb-3">
                                        <input id="canvas-height" min="10" step="10" type="number"
                                            class="form-control form-control-lg form-control-solid" value="300" />
                                        <span class="input-group-text">px</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Line Thickness</label>
                        <div class="col-lg-6">
                            <input id="line-width" type="number"
                                class="form-control form-control-lg form-control-solid" min="1"
                                value="1" />
                        </div>
                    </div>

                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Line Color</label>
                        <div class="col-lg-6">
                            <input id="line-color" type="color"
                                class="form-control form-control-lg form-control-solid w-100 form-control-color"
                                value="#000000" title="Choose a Line Color" />
                        </div>
                    </div>

                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Background Color</label>
                        <div class="col-lg-6">
                            <input id="bg-color" type="color"
                                class="form-control form-control-lg form-control-solid w-100 form-control-color"
                                value="#ffffff" title="Choose a Background Color" />
                        </div>
                    </div>

                    {{-- <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Type</label>
                        <div class="col-lg-6">
                            <!-- Select -->
                            <div class="tom-select-custom">
                                <select
                                    class="js-select form-select form-control-lg form-control-solid tomselected ts-hidden-accessible"
                                    disabled="" autocomplete="off"
                                    data-hs-tom-select-options="{
                          'placeholder': 'Select a Type...',
                          'hideSearch': true
                        }"
                                    id="tomselect-1" tabindex="-1">
                                    <option>Select a Type...</option>

                                    <option selected="">
                                        Wave Graphics
                                    </option>
                                </select>
                                <div
                                    class="ts-wrapper js-select form-select form-control-lg form-control-solid single plugin-change_listener plugin-hs_smart_position plugin-dropdown_input full has-items disabled locked">
                                    <div class="ts-control" role="combobox" aria-haspopup="listbox"
                                        aria-expanded="false" aria-controls="tomselect-1-ts-dropdown"
                                        id="tomselect-1-ts-control" tabindex="-1">
                                        <div data-value="Wave Graphics" class="item" data-ts-item="">
                                            Wave Graphics
                                        </div>
                                        <input class="items-placeholder" tabindex="-1"
                                            placeholder="Select a Type..." />
                                    </div>
                                    <div class="tom-select-custom">
                                        <div class="ts-dropdown single plugin-change_listener plugin-hs_smart_position plugin-dropdown_input"
                                            style="display: none">
                                            <div class="dropdown-input-wrap"></div>
                                            <div role="listbox" tabindex="-1" class="ts-dropdown-content"
                                                id="tomselect-1-ts-dropdown"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Select -->
                        </div>
                    </div> --}}

                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Format</label>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <!-- Radio Check -->
                                <label class="form-control form-control-lg form-control-solid">
                                    <span class="form-check">
                                        <input type="radio" class="form-check-input" name="graphics-format"
                                            value="png" checked />
                                        <span class="form-check-label">.png</span>
                                    </span>
                                </label>
                                <!-- End Radio Check -->

                                <!-- Radio Check -->
                                <label class="form-control form-control-lg form-control-solid">
                                    <span class="form-check">
                                        <input type="radio" class="form-check-input" name="graphics-format"
                                            value="svg" />
                                        <span class="form-check-label">.svg</span>
                                    </span>
                                </label>
                                <!-- End Radio Check -->
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Input Type</label>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <!-- Radio Check -->
                                <label class="form-control form-control-lg form-control-solid">
                                    <span class="form-check">
                                        <input type="radio" class="form-check-input" name="input-types"
                                            checked="" id="input-types--exact" />
                                        <span class="form-check-label">Exact Values</span>
                                    </span>
                                </label>
                                <!-- End Radio Check -->

                                <!-- Radio Check -->
                                <label class="form-control form-control-lg form-control-solid">
                                    <span class="form-check">
                                        <input type="radio" class="form-check-input" name="input-types"
                                            id="input-types--interval" />
                                        <span class="form-check-label">Interval Values</span>
                                    </span>
                                </label>
                                <!-- End Radio Check -->
                            </div>
                        </div>
                    </div>

                    <div id="graphics-intervals" style="display: none">
                        <div class="row mb-4">
                            <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Wave Length</label>
                            <div class="col-lg-6">
                                <div class="input-group d-flex align-items-center justify-content-between">
                                    <div class="w-45">
                                        <input id="wave-length-min" type="number"
                                            class="form-control form-control-solid" value="1" />
                                    </div>
                                    <div>–</div>
                                    <div class="w-45">
                                        <input id="wave-length-max" type="number"
                                            class="form-control form-control-solid" value="100" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Wave Height</label>
                            <div class="col-lg-6">
                                <div class="input-group d-flex align-items-center justify-content-between">
                                    <div class="w-45">
                                        <input id="wave-height-min" type="number"
                                            class="form-control form-control-solid" value="1" />
                                    </div>
                                    <div>–</div>
                                    <div class="w-45">
                                        <input id="wave-height-max" type="number"
                                            class="form-control form-control-solid" value="100" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Wave Distortion</label>
                            <div class="col-lg-6">
                                <div class="input-group d-flex align-items-center justify-content-between">
                                    <div class="w-45">
                                        <input id="wave-distortion-min" type="number"
                                            class="form-control form-control-solid" value="1" />
                                    </div>
                                    <div>–</div>
                                    <div class="w-45">
                                        <input id="wave-distortion-max" type="number"
                                            class="form-control form-control-solid" value="100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <label class="col-lg-3 col-form-label fw-medium mb-2 mb-lg-0">Number of Wave Layers</label>
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <input id="graphics-number" type="number"
                                class="form-control form-control-lg form-control-solid" value="1" />
                        </div>
                        <div class="col-sm-6 col-lg-3">
                            <a id="add-canvas-multiple" class="btn btn-lg btn-primary px-lg-5"
                                href="javascript:;">Generate</a>
                        </div>
                    </div>

                    <hr class="my-lg-8 opacity-50 mx-lg-n5" />

                    <div id="main-container">
                        <div class="loader"></div>
                    </div>

                    <div class="d-flex justify-content-between">
                        <a class="add-canvas btn btn-lg btn-soft-dark px-lg-5" href="javascript:;"><i
                                class="bi bi-plus-lg"></i> Add
                            Wave Layer</a>
                        <a class="download-all btn btn-lg btn-soft-dark px-lg-5" href="javascript:;"><i
                                class="bi bi-box-arrow-down me-1"></i>Download All</a>
                    </div>
                </div>
            </div>
            <!-- End Card -->
        </div>
        <!-- End Content -->

        <!-- Footer -->
        <div class="footer text-muted">
            <div class="container">
                <div class="row justify-content-between align-items-center">
                    <div class="col">
                        <p class="mb-0">2023 © OculusGuard</p>
                    </div>
                    <!-- End Col -->

                    <div class="col-auto">
                        <div class="d-flex justify-content-end">
                            <!-- List Separator -->
                            <ul class="list-inline list-separator">
                                <li class="list-inline-item">
                                    <a class="list-separator-link text-muted" href="#">FAQ</a>
                                </li>

                                <li class="list-inline-item">
                                    <a class="list-separator-link text-muted" href="#">License</a>
                                </li>
                            </ul>
                            <!-- End List Separator -->
                        </div>
                    </div>
                    <!-- End Col -->
                </div>
            </div>
        </div>
        <!-- Footer -->
    </main>
    <!-- ========== END MAIN CONTENT ========== -->

    <!-- JS Global Compulsory  -->
    <script src="{{ asset('assets/vendor/jquery/dist/jquery.min.js') }}" defer></script>
    <script src="{{ asset('assets/vendor/jquery-migrate/dist/jquery-migrate.min.js') }}" defer></script>
    <script src="{{ asset('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}" defer></script>

    <!-- JS Implementing Plugins -->
    <script src="{{ asset('assets/js/hs.theme-appearance.js') }}" defer></script>
    <script src="{{ asset('assets/vendor/tom-select/dist/js/tom-select.complete.min.js') }}" defer></script>

    <!-- JS OculusGuard -->
    <script src="{{ asset('assets/js/theme.min.js') }}" defer></script>

    <!-- JS Plugins Init. -->
    <script>
        (function() {
            // INITIALIZATION OF SELECT
            // =======================================================
            HSCore.components.HSTomSelect.init(".js-select");
        })();
    </script>

    <script>
        document
            .querySelector("#input-types--interval")
            .addEventListener("click", function() {
                if (this.checked) {
                    document.querySelector(
                        "#graphics-intervals"
                    ).style.display = "block";
                }
            });
        document
            .querySelector("#input-types--exact")
            .addEventListener("click", function() {
                if (this.checked) {
                    document.querySelector(
                        "#graphics-intervals"
                    ).style.display = "none";
                }
            });
    </script>
    <script src="{{ asset('js/index.js') }}" defer></script>
</body>

</html>
