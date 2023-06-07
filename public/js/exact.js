// import potrace from "potrace";

window.onload = function () {
    class WaveDrawer {
        constructor(
            canvasId,
            waveLengthInputId,
            waveHeightInputId,
            waveDistortionInputId
        ) {
            this.canvas = $(`#${canvasId}`)[0];
            this.ctx = this.canvas.getContext("2d");

            this.id = canvasId.split("-").pop();

            this.newCanvas = $(`#newCanvas-${this.id}`)[0];

            this.canvasWidthInput = $("#canvas-width")[0];
            this.canvasHeightInput = $("#canvas-height")[0];
            this.canvas.width = this.canvasWidthInput.value;
            this.canvas.height = this.canvasHeightInput.value;

            this.newCanvas.width = this.canvasWidthInput.value;
            this.newCanvas.height = this.canvasHeightInput.value;

            this.width = this.canvasWidthInput.value * 2;
            this.height = this.canvasHeightInput.value * 2;

            this.amplitude = this.canvas.height / 20;
            this.frequency = 0.0001;
            this.speed = 0.0009;
            this.numWaves = this.canvas.height / this.amplitude;
            this.waveInterval = (this.amplitude * 34) / this.numWaves;

            this.lineColor = "#000000";
            this.bgColor = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.lineColor;
            $(this.newCanvas).css("background-color", this.bgColor);

            this.waveLengthInputId = waveLengthInputId;
            this.waveHeightInputId = waveHeightInputId;
            this.waveDistortionInputId = waveDistortionInputId;
        }

        drawWave(yOffset, waveAmplitude, waveFrequency, prevLine) {
            this.ctx.beginPath();
            this.ctx.moveTo(-this.width / 2, yOffset);
            for (let i = 0; i < this.width; i++) {
                let y =
                    yOffset +
                    waveAmplitude * Math.sin(waveFrequency * i + this.speed);
                if (prevLine && y < prevLine[i] - 5) {
                    y = prevLine[i] - 5;
                }
                this.ctx.lineTo(i - this.width / 2, y);
                this.ctx.__currentY = y;
            }
            this.ctx.stroke();
            return this.ctx.__currentY;
        }

        draw() {
            $(this.canvas).attr("width", $(this.canvasWidthInput).val());
            $(this.canvas).attr("height", $(this.canvasHeightInput).val());

            $(this.newCanvas).attr("width", $(this.canvasWidthInput).val());
            $(this.newCanvas).attr("height", $(this.canvasHeightInput).val());

            this.ctx.clearRect(
                0,
                0,
                $(this.canvas).width(),
                $(this.canvas).height()
            );
            this.ctx.save();
            this.ctx.scale(
                $(this.canvas).width() / this.width,
                $(this.canvas).height() / this.height
            );
            this.ctx.translate(this.width / 2, this.height / 2);

            let prevLine;
            const waveLength = parseFloat(
                -0.001 +
                    (($(`#${this.waveLengthInputId}`).val() - 1) * 0.002) / 99
            );
            const waveHeight = parseFloat(
                -100 + (($(`#${this.waveHeightInputId}`).val() - 1) * 200) / 99
            );
            const waveDistortion = parseFloat(
                -500 +
                    (($(`#${this.waveDistortionInputId}`).val() - 1) * 700) / 99
            );
            const bgColor = $("#bg-color").val();
            $(this.newCanvas).css("background-color", bgColor);
            const lineColor = $("#line-color").val();
            this.ctx.strokeStyle = lineColor;
            const lineWidth = $("#line-width").val();
            this.ctx.lineWidth = lineWidth;
            for (let i = 0; i < this.numWaves; i++) {
                let waveAmplitude, waveFrequency;
                if (i > this.numWaves / 3 || i >= (this.numWaves * 2) / 3) {
                    waveAmplitude = waveHeight + i * 0.001;
                    waveFrequency =
                        waveLength +
                        (i - this.numWaves / 6) *
                            (0.001 + waveDistortion * 0.00001);
                } else if (i < (this.numWaves * 2) / 3) {
                    waveAmplitude = waveHeight + i * 0.01;
                    waveFrequency =
                        waveLength -
                        (i - this.numWaves / 2) *
                            (0.001 + waveDistortion * 0.00001);
                }
                prevLine = this.drawWave(
                    i * this.waveInterval - (this.height * 0.75) / 2,
                    waveAmplitude,
                    waveFrequency,
                    prevLine
                );
            }

            this.ctx.restore();

            initializeCanvas(this.id);

            this.addDataProperties();
        }

        addDataProperties() {
            const canvasWidth = document.getElementById("canvas-width").value;
            const canvasHeight = document.getElementById("canvas-height").value;
            const lineWidth = document.getElementById("line-width").value;
            const lineColor = document.getElementById("line-color").value;
            const bgColor = document.getElementById("bg-color").value;

            this.canvas.dataset.id = this.newCanvas.id.match(/\d+/g);
            this.canvas.dataset.width = canvasWidth;
            this.canvas.dataset.height = canvasHeight;
            this.canvas.dataset.lineWidth = lineWidth;
            this.canvas.dataset.lineColor = lineColor;
            this.canvas.dataset.bgColor = bgColor;
            this.canvas.dataset.waveLength = document.getElementById(
                this.waveLengthInputId
            ).value;
            this.canvas.dataset.waveHeight = document.getElementById(
                this.waveHeightInputId
            ).value;
            this.canvas.dataset.waveDistortion = document.getElementById(
                this.waveDistortionInputId
            ).value;

            const params = $("#params").html().trim();
            const $fav = $(
                `.favourite[data-id="${this.newCanvas.id.match(/\d+/g)}"]`
            ).children();
            if (params) {
                let array = params
                    .split(/\r?\n/)
                    .map((line) => JSON.parse(line.trim()))
                    .flat();

                const matchFound = array.some((object) =>
                    Object.entries(object).every(
                        ([key, value]) =>
                            key === "id" || this.canvas.dataset[key] === value
                    )
                );

                if (matchFound) {
                    $fav.removeClass("bi-star");
                    $fav.addClass("bi-star-fill text-primary");
                }
            }
        }
    }

    let canvasCount = 1;

    function addCanvas() {
        const canvasContainer = $("<div>");
        canvasContainer.addClass("layer row mb-6");
        canvasContainer.attr("id", `layer-${canvasCount}`);
        canvasContainer.html(`
            <div class="col-lg-3 mb-2 mb-lg-0">
                <div id="star-container" class="d-flex align-items-center mb-3">
                    <h2 class="mb-0">Wave Layer #${canvasCount}</h2>
                    <form id="save-canvas-form" method="POST" action="javascript:;" enctype="multipart/form-data">
                        <input type="file" id="fileInput-${canvasCount}" name="canvas_path" style="display: none;">
                        <button type="submit" style="outline: none; border: none; background-color: inherit;" data-id="${canvasCount}" class="ms-3 text-muted text-hover-warning favourite" data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-title="Save">
                            <i class="bi bi-star"></i>
                        </button>
                    </form>
                </div>
                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Length</label>
                    <input id="wave-length-${canvasCount}" type="number" class="form-control form-control-solid" />
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Height</label>
                    <input id="wave-height-${canvasCount}" type="number" class="form-control form-control-solid" />
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Distortion</label>
                    <input id="wave-distortion-${canvasCount}" type="number" class="form-control form-control-solid" />
                </div>
                <div class="row gap-2 flex-lg-nowrap">
                    <a id="try-again-${canvasCount}" data-id="${canvasCount}" class="col-lg-5 btn btn-soft-primary mb-2" href="javascript:;"><i class="bi bi-arrow-repeat me-1"></i>
                    Reload</a>
                    <a id="download-${canvasCount}" data-id="${canvasCount}" class="download col-lg-5 btn btn-primary mb-2" href "javascript:;"><i class="bi bi-box-arrow-down"></i> Download</a>
                </div>
            </div>
            <div class="col-lg-9 position-relative">
                <div class="border border-dotted p-4 overflow-auto rounded position-relative" style "width: max-content; height: max-content;">
                    <div class="mb-5">
                    <small class="position-absolute top-0 end-0 mt-4 me-4 badge bg-primary text-white fw-medium text-uppercase text-ls">${
                        canvasCount == 1 ? "1 layer" : canvasCount + " layers"
                    }</small>
                    </div>
                    <canvas class="myCanvas" id="myCanvas-${canvasCount}"></canvas>
                    <canvas class="newCanvas" id="newCanvas-${canvasCount}"></canvas>
                </div>
            </div>
        `);
        $("#main-container").append(canvasContainer);

        ["length", "height", "distortion"].forEach((property) =>
            $(`#wave-${property}-${canvasCount}`).val(
                Math.floor(
                    Math.random() *
                        ($(`#wave-${property}-max`).val() -
                            $(`#wave-${property}-min`).val() +
                            1) +
                        +$(`#wave-${property}-min`).val()
                )
            )
        );

        const waveDrawer = new WaveDrawer(
            `myCanvas-${canvasCount}`,
            `wave-length-${canvasCount}`,
            `wave-height-${canvasCount}`,
            `wave-distortion-${canvasCount}`
        );

        waveDrawer.draw();
        $(
            `#wave-length-${canvasCount}, #wave-height-${canvasCount}, #wave-distortion-${canvasCount}, #canvas-width, #canvas-height, #bg-color, #line-color, #line-width`
        ).on("input", () => waveDrawer.draw());
        $("#canvas-height").on("input", (event) => {
            $(".newCanvas").css("height", event.target.value + "px");
            $("#canvas-height").attr("value", $("#canvas-height").val());
        });
        $(`#try-again-${canvasCount}`).on("click", (event) => {
            ["length", "height", "distortion"].forEach((property) => {
                const el = $(`#wave-${property}-${event.target.dataset.id}`);
                const max = +$(`#wave-${property}-max`).val();
                const min = +$(`#wave-${property}-min`).val();
                el.val(Math.floor(Math.random() * (max - min + 1) + min));
            });
            waveDrawer.draw();
        });
        $(`#download-${canvasCount}`).on("click", (event) => {
            let format = $('input[name="graphics-format"]:checked').val();
            if (format === "png") downloadPNG(event.target.dataset.id);
            else if (format === "svg") downloadSVG(event.target.dataset.id);
        });

        initializeCanvas(canvasCount);

        $(`.favourite[data-id="${canvasCount}"]`).on("click", function () {
            $(this).attr(
                "data-bs-title",
                $(this).hasClass("bi-star") ? "Save" : "Unsave"
            );
            $(this).children().toggleClass("bi-star bi-star-fill text-primary");
            uploadImageToInput($(this).attr("data-id"));
        });

        canvasCount++;
    }

    function removeCanvases() {
        const container = $("#main-container");
        while (container.children().length > 1) {
            container.children().last().remove();
        }
        $("#add-canvas-multiple").text("Regenerate");
        canvasCount = 1;
    }

    $(".download-all").on("click", () => {
        let format = $('input[name="graphics-format"]:checked').val();
        $(".download").each((index, element) => {
            if (format === "png") downloadPNG($(element).data("id"));
            else if (format === "svg") downloadSVG($(element).data("id"));
        });
    });

    $("#add-canvas-multiple").on("click", () => {
        $(".loader").css("display", "flex");
        removeCanvases();
        for (let i = 0; i < $("#graphics-number").val(); i++) {
            addCanvas();
        }
        setTimeout(() => {
            $(".loader").css("display", "none");
        }, 2000);
    });

    $(".add-canvas").on("click", () => {
        addCanvas();
        $("#add-canvas-multiple").text("Regenerate");
    });

    function selectElementsWithIdsTill(id) {
        let selectors = [];
        for (let i = 1; i <= id; i++) {
            selectors.push("#myCanvas-" + i);
        }
        let query = selectors.join(", ");
        return $(query);
    }

    function initializeCanvas(id) {
        const newCanvas = $(`#newCanvas-${id}`)[0];
        const newCtx = newCanvas.getContext("2d");

        const canvasElements = selectElementsWithIdsTill(id);

        function redraw() {
            newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);

            for (let i = 0; i < canvasElements.length; i++) {
                const canvas = canvasElements[i];
                const ctx = canvas.getContext("2d");

                newCtx.drawImage(canvas, 0, 0);

                $(newCanvas).css("zIndex", i + 1);
            }

            requestAnimationFrame(redraw);
        }

        redraw();
    }

    let name = $("#canvas-name");
    name.on("input", (event) => {
        name.val(event.target.value);
    });

    function downloadSVG(id) {
        let canvas = $(`#newCanvas-${id}`)[0];
        let pngData = canvas.toDataURL("image/png");
        potrace.trace(pngData, (err, svg) => {
            if (err) throw err;
            let anchor = $("<a>");
            anchor.attr("href", "data:image/svg+xml;base64," + btoa(svg));
            anchor.attr("download", `${name.val()}.svg`);
            anchor[0].click();
        });
    }

    function downloadPNG(id) {
        let canvas = $(`#newCanvas-${id}`)[0];
        let anchor = $("<a>");
        anchor.attr("href", canvas.toDataURL("image/png"));
        anchor.attr("download", `${name.val()}.png`);
        anchor[0].click();
    }

    $(".newCanvas").each((index, element) => {
        let canvasHeightInput = $("#canvas-height").val();
        $(element).css("height", canvasHeightInput + "px");
    });

    function uploadImageToInput(canvasId) {
        const canvas = $(`#newCanvas-${canvasId}`)[0];
        const image = new Image();
        image.src = canvas.toDataURL("image/png");
        const fileInput = $(`#fileInput-${canvasId}`);
        const dataTransfer = new DataTransfer();
        const file = dataURLtoFile(image.src, `${name.val()}.png`);
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        const formData = new FormData(fileInput.form);
        formData.append("_token", $('meta[name="csrf-token"]')[0].content);
        formData.append("params", createCanvasJson(canvasId));
        formData.append("canvas_path", fileInput.files[0]);
        formData.append("layers", canvasId);

        $.ajax({
            url: "/favourite",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $(".avatar-initials").html(response);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });

        return false;
    }

    function dataURLtoFile(dataUrl, fileName) {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], fileName, { type: mime });
    }

    function createCanvasJson(dataId) {
        const canvasDataContainer = [];

        const canvases = document.querySelectorAll(
            `canvas[data-id="${dataId}"]`
        );

        canvases.forEach((canvas, index) => {
            const canvasData = {};
            const dataset = canvas.dataset;

            Object.keys(dataset).forEach((key) => {
                canvasData[key] = dataset[key];
            });

            canvasDataContainer.push(canvasData);
        });

        return JSON.stringify(canvasDataContainer);
    }
};
