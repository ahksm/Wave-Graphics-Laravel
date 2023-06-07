// import potrace from "potrace";

window.onload = function () {
    class WaveDrawer {
        constructor(
            canvasId,
            newCanvasId,
            waveLengthInputId,
            waveHeightInputId,
            waveDistortionInputId
        ) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext("2d");

            this.newCanvas = document.getElementById(newCanvasId);

            this.canvasWidthInput = document.getElementById("canvas-width");
            this.canvasHeightInput = document.getElementById("canvas-height");
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
            this.newCanvas.style.backgroundColor = this.bgColor;

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
            this.canvas.width = this.canvasWidthInput.value;
            this.canvas.height = this.canvasHeightInput.value;

            this.newCanvas.width = this.canvasWidthInput.value;
            this.newCanvas.height = this.canvasHeightInput.value;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save();
            this.ctx.scale(
                this.canvas.width / this.width,
                this.canvas.height / this.height
            );
            this.ctx.translate(this.width / 2, this.height / 2);

            let prevLine;
            const waveLength = parseFloat(
                -0.001 +
                    ((document.getElementById(this.waveLengthInputId).value -
                        1) *
                        0.002) /
                        99
            );
            const waveHeight = parseFloat(
                -100 +
                    ((document.getElementById(this.waveHeightInputId).value -
                        1) *
                        200) /
                        99
            );
            const waveDistortion = parseFloat(
                -500 +
                    ((document.getElementById(this.waveDistortionInputId)
                        .value -
                        1) *
                        700) /
                        99
            );
            const bgColor = document.getElementById("bg-color").value;
            this.newCanvas.style.backgroundColor = bgColor;
            const lineColor = document.getElementById("line-color").value;
            this.ctx.strokeStyle = lineColor;
            const lineWidth = document.getElementById("line-width").value;
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

            let newCanvasId = this.newCanvas.id.match(/\d+/g);

            initializeCanvas(newCanvasId);

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
        const canvasContainer = document.createElement("div");
        canvasContainer.classList.add("layer");
        canvasContainer.classList.add("row");
        canvasContainer.classList.add("mb-6");
        canvasContainer.setAttribute("id", `layer-${canvasCount}`);
        canvasContainer.innerHTML = `
            <div class="col-lg-3 mb-2 mb-lg-0">
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mb-0">Wave #${canvasCount}</h2>
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
                    <input id="wave-length-${canvasCount}" type="number" class="form-control form-control-solid" disabled />
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Height</label>
                    <input id="wave-height-${canvasCount}" type="number" class="form-control form-control-solid" disabled />
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium">Wave Distortion</label>
                    <input id="wave-distortion-${canvasCount}" type="number" class="form-control form-control-solid" disabled />
                </div>

                <div class="row gap-2 flex-lg-nowrap">
                    <a id="try-again-${canvasCount}" data-id="${canvasCount}" class="col-lg-5 btn btn-soft-primary mb-2" href="javascript:;"><i class="bi bi-arrow-repeat me-1"></i>
                    Reload</a>
                    <a id="download-${canvasCount}" data-id="${canvasCount}" class="download col-lg-5 btn btn-primary mb-2" href="javascript:;"><i class="bi bi-box-arrow-down"></i> Download</a>
                </div>
            </div>
            <div class="col-lg-9 position-relative">
                <div id="canvas-container-${canvasCount}" class="border border-dotted p-4 overflow-auto rounded position-relative" style="width: max-content; height: max-content; padding-top: 20px;">
                    <div class="mb-5">
                        <small id="badge-${canvasCount}" class="position-absolute top-0 end-0 mt-4 me-4 badge bg-primary text-white fw-medium text-uppercase text-ls">${
            document.getElementById("layers-number").value == 1
                ? "1 layer"
                : document.getElementById("layers-number").value + " layers"
        }</small>
                    </div>
                </div>
            </div>
        `;
        const mainContainer = document.getElementById("main-container");
        mainContainer.appendChild(canvasContainer);

        ["length", "height", "distortion"].forEach(
            (property) =>
                (document.getElementById(
                    `wave-${property}-${canvasCount}`
                ).value = Math.floor(
                    Math.random() *
                        (+document.getElementById(`wave-${property}-max`)
                            .value -
                            +document.getElementById(`wave-${property}-min`)
                                .value +
                            1) +
                        +document.getElementById(`wave-${property}-min`).value
                ))
        );

        const n = parseInt(document.getElementById("layers-number").value);

        for (let i = 1; i <= n; i++) {
            const canvasContainer = document.getElementById(
                `canvas-container-${canvasCount}`
            );

            const canvas = document.createElement("canvas");
            canvas.className = "myCanvas";
            canvas.id = `myCanvas-${canvasCount}.${i}`;

            const canvasId = `newCanvas-${canvasCount}`;

            let newCanvas =
                document.getElementById(canvasId) ||
                document.body.appendChild(
                    Object.assign(document.createElement("canvas"), {
                        className: "newCanvas",
                        id: canvasId,
                    })
                );

            canvasContainer.appendChild(canvas);
            canvasContainer.appendChild(newCanvas);

            const waveDrawer = new WaveDrawer(
                `myCanvas-${canvasCount}.${i}`,
                `newCanvas-${canvasCount}`,
                `wave-length-${canvasCount}`,
                `wave-height-${canvasCount}`,
                `wave-distortion-${canvasCount}`
            );

            const addInputListener = (inputId, callback) => {
                document
                    .getElementById(inputId)
                    .addEventListener("input", callback);
            };

            waveDrawer.draw();
            addInputListener(`canvas-width`, () => waveDrawer.draw());
            addInputListener(`canvas-height`, (event) => {
                document
                    .querySelectorAll(".newCanvas")
                    .forEach(
                        (element) =>
                            (element.style.height = event.target.value + "px")
                    );
                canvasHeightInput.setAttribute(
                    "value",
                    canvasHeightInput.value
                );
                waveDrawer.draw();
            });
            addInputListener(`wave-length-${canvasCount}`, () =>
                waveDrawer.draw()
            );
            addInputListener(`wave-height-${canvasCount}`, () =>
                waveDrawer.draw()
            );
            addInputListener(`wave-distortion-${canvasCount}`, () =>
                waveDrawer.draw()
            );
            addInputListener(`bg-color`, () => waveDrawer.draw());
            addInputListener(`line-color`, () => waveDrawer.draw());
            addInputListener(`line-width`, () => waveDrawer.draw());

            document
                .getElementById(`try-again-${canvasCount}`)
                .addEventListener("click", (event) => {
                    ["length", "height", "distortion"].forEach((property) => {
                        const el = document.getElementById(
                            `wave-${property}-${event.target.dataset.id}`
                        );
                        const max = +document.getElementById(
                            `wave-${property}-max`
                        ).value;
                        const min = +document.getElementById(
                            `wave-${property}-min`
                        ).value;
                        el.value = Math.floor(
                            Math.random() * (max - min + 1) + min
                        );
                    });
                    waveDrawer.draw();
                });

            document
                .getElementById(`download-${canvasCount}`)
                .addEventListener("click", (event) => {
                    let format = document.querySelector(
                        'input[name="graphics-format"]:checked'
                    ).value;
                    if (format === "png") downloadPNG(event.target.dataset.id);
                    else if (format === "svg")
                        downloadSVG(event.target.dataset.id);
                });
        }

        initializeCanvas(canvasCount);

        $(`.favourite[data-id="${canvasCount}"]`).on("click", function () {
            $(this).attr(
                "data-bs-title",
                $(this).hasClass("bi-star") ? "Save" : "Unsave"
            );
            $(this).children().toggleClass("bi-star bi-star-fill text-primary");
            uploadImageToInput(canvasCount - 1);
        });

        canvasCount++;
    }

    function removeCanvases() {
        const container = document.querySelector("#main-container");
        while (container.children.length > 1) {
            container.removeChild(container.lastChild);
        }
        document.getElementById("add-canvas-multiple").innerText = "Regenerate";
        canvasCount = 1;
    }

    document.querySelector(".download-all").addEventListener("click", () => {
        let format = document.querySelector(
            'input[name="graphics-format"]:checked'
        ).value;
        document.querySelectorAll(".download").forEach((element) => {
            if (format === "png") downloadPNG(element.dataset.id);
            else if (format === "svg") downloadSVG(element.dataset.id);
        });
    });

    document
        .getElementById("add-canvas-multiple")
        .addEventListener("click", () => {
            document.querySelector(".loader").style.display = "flex";
            removeCanvases();
            for (
                let i = 0;
                i < document.getElementById("graphics-number").value;
                i++
            ) {
                addCanvas();
            }
            setTimeout(() => {
                document.querySelector(".loader").style.display = "none";
            }, 2000);
        });

    document.querySelector(".add-canvas").addEventListener("click", () => {
        addCanvas();
        document.getElementById("add-canvas-multiple").innerText = "Regenerate";
    });

    function selectElementsWithIdsTill(id) {
        const layersNum = document.getElementById("layers-number").value;
        let selectors = [];
        for (let l = 1; l <= layersNum + 1; l++) {
            selectors.push(`#myCanvas\\-${id}\\.${l}`);
        }
        let query = selectors.join(", ");
        return document.querySelectorAll(query);
    }

    function initializeCanvas(id) {
        const newCanvas = document.getElementById(`newCanvas-${id}`);
        const newCtx = newCanvas.getContext("2d");

        const canvasElements = selectElementsWithIdsTill(id);

        function redraw() {
            newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);

            for (let i = 0; i < canvasElements.length; i++) {
                const canvas = canvasElements[i];
                const ctx = canvas.getContext("2d");

                newCtx.drawImage(canvas, 0, 0);

                newCanvas.style.zIndex = i + 1;
            }

            requestAnimationFrame(redraw);
        }

        redraw();

        document.getElementById(`try-again-${id}`).click();
    }

    let name = document.getElementById("canvas-name");
    name.addEventListener("input", (event) => {
        name.value = event.target.value;
    });

    function downloadSVG(id) {
        let canvas = document.getElementById(`newCanvas-${id}`);
        let pngData = canvas.toDataURL("image/png");
        potrace.trace(pngData, (err, svg) => {
            if (err) throw err;
            let anchor = document.createElement("a");
            anchor.href = "data:image/svg+xml;base64," + btoa(svg);
            anchor.download = `${name.value}.svg`;
            anchor.click();
        });
    }

    function downloadPNG(id) {
        let canvas = document.getElementById(`newCanvas-${id}`);
        let anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = `${name.value}.png`;
        anchor.click();
    }

    document.querySelectorAll(".newCanvas").forEach((element) => {
        let canvasHeightInput = document.getElementById("canvas-height").value;
        element.style.height = canvasHeightInput + "px";
    });

    function uploadImageToInput(canvasId) {
        const canvas = document.getElementById(`newCanvas-${canvasId}`);
        const image = new Image();
        image.src = canvas.toDataURL("image/png");
        const fileInput = document.getElementById(`fileInput-${canvasId}`);
        const dataTransfer = new DataTransfer();
        const file = dataURLtoFile(image.src, `${name.value}.png`);
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        const formData = new FormData(fileInput.form);
        formData.append("_token", $('meta[name="csrf-token"]')[0].content);
        formData.append("params", createCanvasJson(canvasId));
        formData.append("canvas_path", fileInput.files[0]);
        formData.append(
            "layers",
            document
                .querySelector(`#badge-${canvasId}`)
                .textContent.replace(/\D/g, "")
        );

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
