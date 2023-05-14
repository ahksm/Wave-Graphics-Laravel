<x-guest-layout>
    <div class="container d-lg-flex justify-content-lg-center align-items-center h-100">
        <!-- Card -->
        <div class="card card-lg border-0 w-lg-40">
            <div class="card-body">
                <!-- Form -->
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="text-center">
                        <div class="mb-5">
                            <h1>Register</h1>
                            <p>
                                Already Registered?
                                <a class="link" href="login">Sign in here</a>
                            </p>
                        </div>
                    </div>

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium" for="signupSrName">Name</label>
                        <input type="text" class="form-control form-control-lg form-control-solid" name="name"
                            id="signupSrName" tabindex="1" placeholder="John Doe" aria-label="John Doe" required
                            :value="old('name')" autofocus />
                    </div>
                    <!-- End Form -->

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium" for="signupSrEmail">Email</label>
                        <input type="email" class="form-control form-control-lg form-control-solid" name="email"
                            id="signupSrEmail" tabindex="2" placeholder="email@address.com"
                            aria-label="email@address.com" required :value="old('email')" autofocus />
                    </div>
                    <!-- End Form -->

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium" for="signupSrEmail">Role</label>
                        <select id="role" class="form-control form-control-lg form-control-solid" name="role"
                            tabindex="3">
                            <option value="user" selected>User</option>
                            <option value="admin">Admin</option>
                        </select>
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
                            Register
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
