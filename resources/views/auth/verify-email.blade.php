<x-guest-layout>
    <div class="container d-lg-flex justify-content-lg-center align-items-center h-100">
        <!-- Card -->
        <div class="card card-lg border-0 w-lg-40">
            <div class="card-body">
                <div class="mb-4 text-sm text-gray-600">
                    {{ __('Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.') }}
                </div>

                @if (session('status') == 'verification-link-sent')
                    <div class="mb-4 font-medium text-sm text-green-600">
                        {{ __('A new verification link has been sent to the email address you provided during registration.') }}
                    </div>
                @endif

                <div class="d-flex justify-content-between align-items-center">
                    <!-- Form -->
                    <form method="POST" action="{{ route('verification.send') }}">
                        @csrf

                        <div class="d-grid">
                            <button type="submit" name="submit" class="btn btn-primary btn-lg">
                                Resend Verification Email
                            </button>
                        </div>
                    </form>
                    <!-- End Form -->

                    <!-- Form -->
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf

                        <div class="d-grid">
                            <button type="submit" name="submit" class="btn btn-secondary btn-lg">
                                Log Out
                            </button>
                        </div>
                    </form>
                    <!-- End Form -->
                </div>
            </div>
        </div>
        <!-- End Card -->
    </div>
    <!-- End Content -->
    <!-- ========== END MAIN CONTENT ========== -->
</x-guest-layout>
