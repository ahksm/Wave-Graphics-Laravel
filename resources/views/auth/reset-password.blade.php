<x-guest-layout>
    <div class="container d-lg-flex justify-content-lg-center align-items-center h-100">
        <!-- Card -->
        <div class="card card-lg border-0 w-lg-40">
            <div class="card-body">
                <!-- Form -->
                <form method="POST" action="{{ route('password.email') }}">
                    @csrf

                    <input type="hidden" name="token" value="{{ $request->route('token') }}">

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium" for="signinSrEmail">Email</label>
                        <input type="email" class="form-control form-control-lg form-control-solid" name="email"
                            id="signinSrEmail" tabindex="1" placeholder="email@address.com"
                            aria-label="email@address.com" required="" :value="old('email', $request-> email)"
                            autofocus />
                    </div>
                    <!-- End Form -->

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium w-100" for="signupSrPassword" tabindex="4">
                            <span class="d-flex justify-content-between align-items-center">
                                <span>Password</span>
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

                    <div class="mb-4">
                        <label class="form-label fw-medium w-100" for="password_confirmation" tabindex="5">
                            <span class="d-flex justify-content-between align-items-center">
                                <span>Confirm Password</span>
                            </span>
                        </label>

                        <div class="input-group input-group-merge input-group-solid"
                            data-hs-validation-validate-class="">
                            <input type="password"
                                class="js-toggle-password form-control form-control-lg form-control-solid"
                                name="password_confirmation" id="password_confirmation"
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

                    <div class="d-grid">
                        <button type="submit" name="submit" class="btn btn-primary btn-lg">
                            Reset Password
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
