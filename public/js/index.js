import C2S from "canvas2svg";

window.onload = function () {
    class WaveDrawer {
        constructor(
            canvasId,
            canvasWidthInputId,
            canvasHeightInputId,
            waveLengthInputId,
            waveHeightInputId,
            waveDistortionInputId,
            bgColorInputId,
            lineColorInputId,
            lineWidthInputId,
            canvasNameInputId
        ) {
            this.canvasId = canvasId;
            this.canvas = document.getElementById(canvasId);
            this.newCanvas = document.getElementById(
                `newCanvas-${+this.canvasId.split("-")[1]}`
            );
            this.canvasWidthInput = document.getElementById(canvasWidthInputId);
            this.canvasHeightInput =
                document.getElementById(canvasHeightInputId);
            this.ctx = new C2S(
                this.canvasWidthInput.value,
                this.canvasHeightInput.value
            );
            this.canvas.width = this.canvasWidthInput.value;
            this.canvas.height = this.canvasHeightInput.value;
            this.newCanvas.width = this.canvasWidthInput.value;
            this.newCanvas.height = this.canvasHeightInput.value;
            this.width = this.canvasWidthInput.value * 2;
            this.height = this.canvasWidthInput.value * 2;
            this.amplitude = this.canvas.height / 20;
            this.frequency = 0.0001;
            this.speed = 0.0009;
            this.numWaves = (this.canvas.height / this.amplitude) * 2;
            this.waveInterval = (this.amplitude * 34) / this.numWaves;
            this.lineWidthInputId = lineWidthInputId;
            this.lineColorInputId = lineColorInputId;
            this.bgColorInputId = bgColorInputId;
            this.lineColor = "#000000";
            this.bgColor = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.lineColor;
            this.canvasNameInputId = canvasNameInputId;
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
            const lineColor = document.getElementById(
                this.lineColorInputId
            ).value;
            this.ctx.strokeStyle = lineColor;
            const lineWidth = document.getElementById(
                this.lineWidthInputId
            ).value;
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

            let svg = this.ctx.getSerializedSvg(true);
            this.canvas.innerHTML = svg;

            mergeSVGs(+this.canvasId.split("-")[1]);
        }
    }

    const waveDrawer = new WaveDrawer(
        "myCanvas-1",
        "canvas-width",
        "canvas-height",
        "wave-length-1",
        "wave-height-1",
        "wave-distortion-1",
        "bg-color",
        "line-color",
        "line-width",
        "canvas-name"
    );

    const inputs = [
        "canvas-width",
        "canvas-height",
        "wave-length-1",
        "wave-height-1",
        "wave-distortion-1",
        "bg-color",
        "line-color",
        "line-width",
    ];

    inputs.forEach((input) => {
        document.getElementById(input).addEventListener("input", () => {
            waveDrawer.draw();
        });
    });

    waveDrawer.draw();

    const maxCanvasCount = 6;
    let canvasCount = 2;

    function addCanvas() {
        if (canvasCount == 6) {
            document.getElementById("add-canvas").style.display = "none";
        }
        if (canvasCount > maxCanvasCount) return;

        const canvasName = `myCanvas-${canvasCount}`;
        const canvasContainer = document.createElement("div");
        canvasContainer.classList.add("layer");
        canvasContainer.setAttribute("id", `layer-${canvasCount}`);
        canvasContainer.innerHTML = `
            <div class="inputs">
                <h2>Wavelayer${canvasCount}</h2>
                <div class="input-form">
                    <label for="wave-length-${canvasCount}">Wave Length:</label>
                    <input type="number" id="wave-length-${canvasCount}" value="${
            Math.floor(Math.random() * 100) + 1
        }" min="1" max="100" step="1" />
                </div>
                <div class="input-form">
                    <label for="wave-height-${canvasCount}">Wave Height:</label>
                    <input type="number" id="wave-height-${canvasCount}" value="${
            Math.floor(Math.random() * 100) + 1
        }" min="1" max="100" step="1" />
                </div>
                <div class="input-form">
                    <label for="wave-distortion-${canvasCount}">Wave Distortion:</label>
                    <input type="number" id="wave-distortion-${canvasCount}" value="${
            Math.floor(Math.random() * 100) + 1
        }" min="1" max="100" step="1" />
                </div>
                <button class="download" data-id="${canvasCount}">Download</button>
            </div>
            <div id="canvas-container">
                <canvas class="myCanvas" id="${canvasName}"></canvas>
                <canvas class="newCanvas" id="newCanvas-${canvasCount}"></canvas>
            </div>
        `;
        const mainContainer = document.getElementById("main-container");
        const addCanvasButton = document.getElementById("add-canvas");
        mainContainer.appendChild(canvasContainer);
        addCanvasButton.parentNode.insertBefore(mainContainer, addCanvasButton);
        const waveDrawer = new WaveDrawer(
            `myCanvas-${canvasCount}`,
            `canvas-width`,
            `canvas-height`,
            `wave-length-${canvasCount}`,
            `wave-height-${canvasCount}`,
            `wave-distortion-${canvasCount}`,
            `bg-color`,
            `line-color`,
            `line-width`,
            `canvas-name`
        );
        canvasCount++;
        waveDrawer.draw();

        for (let i = 1; i < canvasCount; i++) {
            const inputs = [
                "canvas-width",
                "canvas-height",
                `wave-length-${i}`,
                `wave-height-${i}`,
                `wave-distortion-${i}`,
                "bg-color",
                "line-color",
                "line-width",
            ];

            inputs.forEach((input) => {
                document.getElementById(input).addEventListener("input", () => {
                    waveDrawer.draw;
                });
            });
        }

        document.querySelectorAll(".download").forEach((element) => {
            element.addEventListener("click", (event) => {
                let format = document.querySelector(
                    'input[name="format"]:checked'
                ).value;
                if (format === "png") {
                    downloadPNG(event.target.getAttribute("data-id"));
                } else if (format === "svg") {
                    downloadSVG(event.target.getAttribute("data-id"));
                }
            });
        });

        document.querySelectorAll(".delete").forEach((element) => {
            element.addEventListener("click", (event) => {
                let id = event.target.getAttribute("data-id");
                document.getElementById(`layer-${id}`).remove();
            });
        });
    }

    document.getElementById("add-canvas").addEventListener("click", addCanvas);

    function mergeSVGs(id) {
        const newSVG = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        const existingSVG = document.getElementById(`newCanvas-${id}`);
        if (existingSVG) existingSVG.innerHTML = "";
        else newSVG.setAttribute("id", `newCanvas-${id}`);

        Array.from(
            selectElementsWithIdsTill(id)[0].querySelector("svg").attributes
        ).forEach((attr) =>
            newSVG.setAttributeNS(attr.namespaceURI, attr.name, attr.value)
        );
        selectElementsWithIdsTill(id).forEach((svg) =>
            Array.from(svg.querySelectorAll("path")).forEach((path) =>
                newSVG.appendChild(path.cloneNode(true))
            )
        );
        (existingSVG || document.getElementById(`myCanvas-${id}`)).appendChild(
            newSVG
        );

        // Set the viewBox attribute dynamically
        const bbox = newSVG.getBBox();
        const viewBoxValue = `${bbox.x - 10} ${bbox.y - 10} ${
            bbox.width + 20
        } ${bbox.height + 20}`;
        newSVG.setAttribute("viewBox", viewBoxValue);

        return new XMLSerializer().serializeToString(newSVG);
    }

    function selectElementsWithIdsTill(id) {
        let selectors = [];
        for (let i = 1; i <= id; i++) {
            selectors.push("#myCanvas-" + i);
        }
        let query = selectors.join(", ");
        return document.querySelectorAll(query);
    }

    let name = document.getElementById("canvas-name");
    name.addEventListener("input", (event) => {
        name.value = event.target.value;
    });

    function downloadSVG(id) {
        let canvas = document.getElementById(`myCanvas-${id}`);
        let pngData = canvas.toDataURL("image/png");
        potrace.trace(pngData, (err, svg) => {
            if (err) throw err;
            let anchor = document.createElement("a");
            anchor.href = "data:image/svg+xml;base64," + btoa(svg);
            anchor.download = `${name.value}.svg`;
            anchor.click();
        });
    }

    mergeSVGs(1);

    function downloadPNG(id) {
        let canvas = document.getElementById(`myCanvas-${id}`);
        let anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = `${name.value}.png`;
        anchor.click();
    }

    document.querySelectorAll(".download").forEach((element) => {
        element.addEventListener("click", (event) => {
            let format = document.querySelector(
                'input[name="format"]:checked'
            ).value;
            if (format === "png") {
                downloadPNG(event.target.getAttribute("data-id"));
            } else if (format === "svg") {
                downloadSVG(event.target.getAttribute("data-id"));
            }
        });
    });

    document.querySelectorAll(".myCanvas").forEach((element) => {
        let canvasHeightInput = document.getElementById("canvas-height").value;
        element.style.height = canvasHeightInput + "px";
    });
};
