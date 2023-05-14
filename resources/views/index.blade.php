<x-layout>
    <div id="main-container">
        <div class="loader"></div>
        <div id="layer-1" class="layer row mb-6">
            <div class="col-lg-3 mb-2 mb-lg-0">
                <h2 class="mb-3">Wave Layer #1</h2>
                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Length</label>
                    <input id="wave-length-1" type="number" class="form-control form-control-solid" />
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Height</label>
                    <input id="wave-height-1" type="number" class="form-control form-control-solid" />
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Distortion</label>
                    <input id="wave-distortion-1" type="number" class="form-control form-control-solid" />
                </div>

                <a id="try-again" class="btn btn-soft-primary px-lg-5 d-block mb-2" href="javascript:;"><i
                        class="bi bi-arrow-repeat me-1"></i>
                    Reload</a>
                <a id="download" data-id="1" class="download btn btn-primary px-lg-5 d-block" href="javascript:;"><i
                        class="bi bi-box-arrow-down me-1"></i>
                    Download</a>
            </div>
            <div class="col-lg-9">
                <div id="canvas-container" class="border border-dotted p-4 overflow-auto rounded">
                    <canvas class="myCanvas" id="myCanvas-1"></canvas>
                    <canvas class="newCanvas" id="newCanvas-1"></canvas>
                </div>
            </div>
        </div>
    </div>
</x-layout>
