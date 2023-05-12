<x-layout :random="$random">
    <div class="row mb-6">
        <div class="col-lg-3 mb-2 mb-lg-0">
            <h2 class="mb-3">Wave Layer #1</h2>
            <div class="mb-4">
                <label class="form-label fw-medium">Wave Length</label>
                <input type="number" class="form-control form-control-solid" value="10" />
            </div>

            <div class="mb-4">
                <label class="form-label fw-medium">Wave Height</label>
                <input type="number" class="form-control form-control-solid" value="27" />
            </div>

            <div class="mb-4">
                <label class="form-label fw-medium">Wave Distortion</label>
                <input type="number" class="form-control form-control-solid" value="89" />
            </div>

            <a class="btn btn-soft-primary px-lg-5 d-block mb-2" href="#"><i class="bi bi-arrow-repeat me-1"></i>
                Reload</a>
            <a class="btn btn-primary px-lg-5 d-block" href="#"><i class="bi bi-box-arrow-down me-1"></i>
                Download</a>
        </div>
        <div class="col-lg-9">
            <div class="border border-dotted p-4 overflow-auto rounded">
                <canvas width="400" height="400"></canvas>
            </div>
        </div>
    </div>
</x-layout>
