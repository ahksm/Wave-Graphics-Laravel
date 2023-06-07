<x-layout :interval="true">
    <div id="main-container">
        <div class="loader">
            <lottie-player src="https://lottie.host/768f8cf2-89a5-4a92-8b84-e58afd06a18e/zQj2wPZheh.json"
                background="transparent" speed="1"
                style="width: 400px; height: 400px; object-fit: cover; z-index: -2;" loop autoplay>
            </lottie-player>
        </div>
    </div>
    <div id="params" class="d-none">
        @foreach ($canvases as $canvas)
            {{ $canvas->params }}
        @endforeach
    </div>
</x-layout>
