<x-guest-layout>
    <div class="container d-lg-flex justify-content-lg-between align-items-center h-100">
        <!--begin::Aside-->
        <div class="text-center text-lg-start py-7">
            <a href="index.html">
                <img class="img-fluid mb-3" src="../assets/i/oculusguard-light.svg" alt="OculusGuard Logo" />
            </a>

            <p class="text-white lead m-0">Some slogan should be here.</p>
        </div>
        <!--begin::Aside-->

        <!-- Card -->
        <div class="card card-lg border-0 w-lg-40">
            <div class="card-body">
                <!-- Form -->
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="text-center">
                        <div class="mb-5">
                            <h1>Sign In</h1>
                            {{-- <p>
                                Don't have an account yet?
                                <a class="link" href="#">Sign up here</a>
                            </p> --}}
                        </div>

                        {{-- <div class="d-grid mb-4">
                            <a class="btn btn-soft-primary btn-lg" href="javascript:;">
                                <span class="d-flex justify-content-center align-items-center">
                                    <img class="avatar avatar-xss me-2" src="../assets/i/google-icon.svg"
                                        alt="Google Icon" />
                                    Sign in with Google
                                </span>
                            </a>
                        </div>

                        <span class="divider-center text-muted opacity-50 small mb-4">OR</span> --}}
                    </div>

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium" for="signinSrEmail">Email</label>
                        <input type="email" class="form-control form-control-lg form-control-solid" name="email"
                            id="signinSrEmail" tabindex="1" placeholder="email@address.com"
                            aria-label="email@address.com" required="" :value="old('email')" autofocus />
                    </div>
                    <!-- End Form -->

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium w-100" for="signupSrPassword" tabindex="0">
                            <span class="d-flex justify-content-between align-items-center">
                                <span>Password</span>

                                @if (Route::has('password.request'))
                                    <a class="form-label-link fw-normal mb-0" href="{{ route('password.request') }}">
                                        {{ __('Forgot password?') }}
                                    </a>
                                @endif
                            </span>
                        </label>

                        <div class="input-group input-group-merge input-group-solid"
                            data-hs-validation-validate-class="">
                            <input type="password"
                                class="js-toggle-password form-control form-control-lg form-control-solid"
                                name="password" id="signupSrPassword" placeholder="8+ characters required"
                                aria-label="8+ characters required" required="" minlength="8"
                                data-hs-toggle-password-options='{
                          "target": "#changePassTarget",
                          "defaultClass": "bi-eye-slash",
                          "showClass": "bi-eye",
                          "classChangeTarget": "#changePassIcon"
                        }' />
                            <a id="changePassTarget" class="input-group-append input-group-text" href="javascript:;">
                                <i id="changePassIcon" class="bi-eye-slash"></i>
                            </a>
                        </div>

                    </div>
                    @if ($errors)
                        <span class="invalid-feedback">
                            <x-auth-validation-errors class="mb-4" :errors="$errors" />
                        </span>
                    @endif
                    <!-- End Form -->

                    <!-- Form Check -->
                    <div class="form-check mb-4">
                        <input class="form-check-input" type="checkbox" value="" id="remember_me"
                            name="remember" />
                        <label class="form-check-label" for="remember_me">
                            Remember me
                        </label>
                    </div>
                    <!-- End Form Check -->

                    <div class="d-grid">
                        <button type="submit" name="submit" class="btn btn-primary btn-lg">
                            Sign In
                        </button>
                    </div>
                </form>
                <!-- End Form -->
            </div>
        </div>
        <!-- End Card -->
    </div>
    <!-- End Content -->
    <!-- ========== END MAIN CONTENT ========== -->
</x-guest-layout>
