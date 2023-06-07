<x-layout :interval="false" :favourites="true">
    <div class="row g-3 g-lg-5">
        @foreach ($canvases as $canvas)
            <div id="canvas-{{ $canvas->id }}" class="col-sm-6 col-lg-3">
                <div class="card overflow-hidden h-200px">
                    <div class="card-body p-0">
                        <img class="img-fluid w-100" src="{{ asset('storage/' . $canvas->canvas_path) }}"
                            alt="Wave #{{ $canvas->id }}">

                        <small
                            class="badge bg-light text-body fw-medium text-uppercase text-ls position-absolute top-0 start-0 mt-3 ms-3">
                            {{ $canvas->layers }} {{ $canvas->layers > 1 ? 'layers' : 'layer' }}
                        </small>

                        <div class="position-absolute bottom-0 end-0 mb-3 me-3">
                            <a class="download btn btn-primary btn-sm btn-icon" data-id="{{ $canvas->id }}"
                                href="javascript:;" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Download"><i class="bi bi-box-arrow-down"></i></a>
                        </div>

                        <div class="position-absolute top-0 end-0 mt-3 me-3">
                            <a href="javascript:;" style="outline: none; border: none; background-color: inherit;"
                                data-id="{{ $canvas->id }}" data-params="{{ $canvas->params }}"
                                class="ms-3 text-muted text-hover-warning favourite" data-bs-toggle="tooltip"
                                data-bs-placement="top" data-bs-title="Unsave">
                                <i class="bi bi-star-fill text-primary"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    <input id="fileInput" type="hidden">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        document.querySelectorAll('.download').forEach(element => {
            element.addEventListener('click', () => {
                const id = element.dataset.id;
                const imageURL = document.querySelector(`#canvas-${id} img`).src;
                const link = document.createElement('a');
                link.href = imageURL;
                link.download = `image-${id}.png`;
                link.click();
            });
        });

        $('.favourite').on('click', function() {
            const canvasId = $(this).data('id');
            const fileInput = $(`#canvas-${canvasId} img`);
            const canvas = $('<canvas>')[0];
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                const dataURL = canvas.toDataURL("image/png");
                const fileInput = $('#fileInput');
                const dataTransfer = new DataTransfer();
                const file = dataURLtoFile(dataURL, `wave.png`);
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;

                const formData = new FormData();
                formData.append("_token", $('meta[name="csrf-token"]').attr('content'));
                formData.append("params", JSON.stringify($(this).data('params')));
                formData.append("canvas_path", fileInput.files[0]);
                formData.append("layers", canvasId);
                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                $.ajax({
                    url: "/favourite",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: response => console.log(response),
                    error: (xhr, status, error) => console.log(error),
                });
            }
            image.src = fileInput.attr('src');

            $(this).children().toggleClass("bi-star bi-star-fill text-primary");
        });

        function dataURLtoFile(dataUrl, fileName) {
            const arr = dataUrl.split(",");
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            const n = bstr.length;
            const u8arr = new Uint8Array(n);
            for (let i = 0; i < n; i++) {
                u8arr[i] = bstr.charCodeAt(i);
            }
            return new File([u8arr], fileName, {
                type: mime
            });
        }
    </script>
</x-layout>
