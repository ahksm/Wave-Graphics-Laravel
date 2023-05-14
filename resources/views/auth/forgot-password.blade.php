<x-guest-layout>
    <div class="container d-lg-flex justify-content-lg-center align-items-center h-100">
        <!-- Card -->
        <div class="card card-lg border-0 w-lg-40">
            <div class="card-body">
                <!-- Form -->
                <form method="POST" action="{{ route('password.email') }}">
                    @csrf

                    <div class="text-center">
                        <div class="mb-5">
                            <p>
                                Forgot your password? No problem. Just let us know your email address and we will email
                                you a password reset link that will allow you to choose a new one.
                            </p>
                        </div>
                    </div>

                    <!-- Form -->
                    <div class="mb-4">
                        <label class="form-label fw-medium" for="signinSrEmail">Email</label>
                        <input type="email" class="form-control form-control-lg form-control-solid" name="email"
                            id="signinSrEmail" tabindex="1" placeholder="email@address.com"
                            aria-label="email@address.com" required="" :value="old('email')" autofocus />
                    </div>
                    <!-- End Form -->
                    @if ($errors)
                        <span class="invalid-feedback">
                            <x-auth-validation-errors class="mb-4" :errors="$errors" />
                        </span>
                    @endif
                    <!-- End Form -->

                    <div class="d-grid">
                        <button type="submit" name="submit" class="btn btn-primary btn-lg">
                            Email Password Reset Link
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
