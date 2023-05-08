import potrace from "potrace";

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
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext("2d");
            var id = canvasId.split("-").pop();
            this.newCanvas = document.getElementById("newCanvas-".concat(id));
            this.canvasWidthInput = document.getElementById(canvasWidthInputId);
            this.canvasHeightInput =
                document.getElementById(canvasHeightInputId);
            this.canvas.width = this.canvasWidthInput.value;
            this.canvas.height = this.canvasHeightInput.value;
            this.newCanvas.width = this.canvasWidthInput.value;
            this.newCanvas.height = this.canvasHeightInput.value;
            this.width = 600;
            this.height = 600;
            this.amplitude = this.canvas.height / 20;
            this.frequency = 0.0001;
            this.speed = 0.0009;
            this.numWaves = this.canvas.height / this.amplitude;
            this.waveInterval = (this.amplitude * 34) / this.numWaves;
            this.lineWidthInputId = lineWidthInputId;
            this.lineColorInputId = lineColorInputId;
            this.bgColorInputId = bgColorInputId;
            this.lineColor = "#000000";
            this.bgColor = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.lineColor;
            this.newCanvas.style.backgroundColor = this.bgColor;
            this.canvasNameInputId = canvasNameInputId;
            this.waveLengthInputId = waveLengthInputId;
            this.waveHeightInputId = waveHeightInputId;
            this.waveDistortionInputId = waveDistortionInputId;
        }
        drawWave(yOffset, waveAmplitude, waveFrequency, prevLine) {
            this.ctx.beginPath();
            this.ctx.moveTo(-this.width / 2, yOffset);
            for (var i = 0; i < this.width; i++) {
                var y =
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
            var prevLine;
            var waveLength = parseFloat(
                -0.001 +
                    ((document.getElementById(this.waveLengthInputId).value -
                        1) *
                        0.002) /
                        99
            );
            var waveHeight = parseFloat(
                -100 +
                    ((document.getElementById(this.waveHeightInputId).value -
                        1) *
                        200) /
                        99
            );
            var waveDistortion = parseFloat(
                -500 +
                    ((document.getElementById(this.waveDistortionInputId)
                        .value -
                        1) *
                        700) /
                        99
            );
            var bgColor = document.getElementById(this.bgColorInputId).value;
            this.newCanvas.style.backgroundColor = bgColor;
            var lineColor = document.getElementById(
                this.lineColorInputId
            ).value;
            this.ctx.strokeStyle = lineColor;
            var lineWidth = document.getElementById(
                this.lineWidthInputId
            ).value;
            this.ctx.lineWidth = lineWidth;
            for (var i = 0; i < this.numWaves; i++) {
                var waveAmplitude = void 0,
                    waveFrequency = void 0;
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
        }
    }
    var waveDrawer = new WaveDrawer(
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
    document.querySelector("#try-again").addEventListener("click", function () {
        ["length", "height", "distortion"].forEach(function (property) {
            return (document.getElementById(
                "wave-".concat(property, "-1")
            ).value = Math.floor(Math.random() * 100 + 1));
        });
        waveDrawer.draw();
    });
    document.querySelector("#try-again").click();
    var canvasWidthInput = document.getElementById("canvas-width");
    canvasWidthInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    var canvasHeightInput = document.getElementById("canvas-height");
    canvasHeightInput.addEventListener("input", function (event) {
        document.querySelectorAll(".newCanvas").forEach(function (element) {
            element.style.height = event.target.value + "px";
        });
        canvasHeightInput.setAttribute("value", canvasHeightInput.value);
        waveDrawer.draw();
    });
    var waveLengthInput = document.getElementById("wave-length-1");
    waveLengthInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    var waveHeightInput = document.getElementById("wave-height-1");
    waveHeightInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    var waveDistortionInput = document.getElementById("wave-distortion-1");
    waveDistortionInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    var bgColorInput = document.getElementById("bg-color");
    bgColorInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    var lineColorInput = document.getElementById("line-color");
    lineColorInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    var lineWidthInput = document.getElementById("line-width");
    lineWidthInput.addEventListener("input", function () {
        waveDrawer.draw();
    });
    waveDrawer.draw();
    var canvasCount = 2;
    function addCanvas() {
        var canvasName = "myCanvas-".concat(canvasCount);
        var canvasContainer = document.createElement("div");
        canvasContainer.classList.add("layer");
        canvasContainer.setAttribute("id", "layer-".concat(canvasCount));
        canvasContainer.innerHTML =
            '\n        <div class="inputs">\n            <h2>Wavelayer'
                .concat(
                    canvasCount,
                    '</h2>\n            <div class="input-form">\n                <label for="wave-length-'
                )
                .concat(
                    canvasCount,
                    '">Wave Length:</label>\n                <input type="number" id="wave-length-'
                )
                .concat(canvasCount, '" value="')
                .concat(
                    Math.floor(Math.random() * 100) + 1,
                    '" min="1" max="100" step="1" />\n            </div>\n            <div class="input-form">\n                <label for="wave-height-'
                )
                .concat(
                    canvasCount,
                    '">Wave Height:</label>\n                <input type="number" id="wave-height-'
                )
                .concat(canvasCount, '" value="')
                .concat(
                    Math.floor(Math.random() * 100) + 1,
                    '" min="1" max="100" step="1" />\n            </div>\n            <div class="input-form">\n                <label for="wave-distortion-'
                )
                .concat(
                    canvasCount,
                    '">Wave Distortion:</label>\n                <input type="number" id="wave-distortion-'
                )
                .concat(canvasCount, '" value="')
                .concat(
                    Math.floor(Math.random() * 100) + 1,
                    '" min="1" max="100" step="1" />\n            </div>\n            <button class="download" data-id="'
                )
                .concat(
                    canvasCount,
                    '">Download</button>\n            <button class="try-again" data-id="'
                )
                .concat(
                    canvasCount,
                    '">Try Again</button>\n        </div>\n        <div id="canvas-container">\n            <canvas class="myCanvas" id="'
                )
                .concat(
                    canvasName,
                    '"></canvas>\n            <canvas class="newCanvas" id="newCanvas-'
                )
                .concat(canvasCount, '"></canvas>\n        </div>\n    ');
        var mainContainer = document.getElementById("main-container");
        mainContainer.appendChild(canvasContainer);
        var waveDrawer = new WaveDrawer(
            "myCanvas-".concat(canvasCount),
            "canvas-width",
            "canvas-height",
            "wave-length-".concat(canvasCount),
            "wave-height-".concat(canvasCount),
            "wave-distortion-".concat(canvasCount),
            "bg-color",
            "line-color",
            "line-width",
            "canvas-name"
        );
        waveDrawer.draw();
        var canvasWidthInput = document.getElementById("canvas-width");
        canvasWidthInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        var canvasHeightInput = document.getElementById("canvas-height");
        canvasHeightInput.addEventListener("input", function (event) {
            document.querySelectorAll(".newCanvas").forEach(function (element) {
                element.style.height = event.target.value + "px";
            });
            canvasHeightInput.setAttribute("value", canvasHeightInput.value);
            waveDrawer.draw();
        });
        var waveLengthInput = document.getElementById(
            "wave-length-".concat(canvasCount)
        );
        waveLengthInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        var waveHeightInput = document.getElementById(
            "wave-height-".concat(canvasCount)
        );
        waveHeightInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        var waveDistortionInput = document.getElementById(
            "wave-distortion-".concat(canvasCount)
        );
        waveDistortionInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        var bgColorInput = document.getElementById("bg-color");
        bgColorInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        var lineColorInput = document.getElementById("line-color");
        lineColorInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        var lineWidthInput = document.getElementById("line-width");
        lineWidthInput.addEventListener("input", function () {
            waveDrawer.draw();
        });
        document.querySelectorAll(".try-again").forEach(function (button) {
            button.addEventListener("click", function () {
                ["length", "height", "distortion"].forEach(function (property) {
                    return (document.getElementById(
                        "wave-".concat(property, "-").concat(button.dataset.id)
                    ).value = Math.floor(Math.random() * 100 + 1));
                });
                waveDrawer.draw();
            });
        });
        initializeCanvas(canvasCount);
        document.querySelectorAll(".download").forEach(function (element) {
            element.addEventListener("click", function (event) {
                var format = document.querySelector(
                    'input[name="format"]:checked'
                ).value;
                if (format === "png") {
                    downloadPNG(event.target.getAttribute("data-id"));
                } else if (format === "svg") {
                    downloadSVG(event.target.getAttribute("data-id"));
                }
            });
        });
        canvasCount++;
    }
    document.getElementById("add-canvas").addEventListener("click", addCanvas);
    function selectElementsWithIdsTill(id) {
        var selectors = [];
        for (var i = 1; i <= id; i++) {
            selectors.push("#myCanvas-" + i);
        }
        var query = selectors.join(", ");
        return document.querySelectorAll(query);
    }
    function initializeCanvas(id) {
        var newCanvas = document.getElementById("newCanvas-".concat(id));
        var newCtx = newCanvas.getContext("2d");
        var canvasElements = selectElementsWithIdsTill(id);
        function redraw() {
            newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);
            for (var i = 0; i < canvasElements.length; i++) {
                var canvas = canvasElements[i];
                var ctx = canvas.getContext("2d");
                newCtx.drawImage(canvas, 0, 0);
                newCanvas.style.zIndex = i + 1;
            }
            requestAnimationFrame(redraw);
        }
        redraw();
    }
    var name = document.getElementById("canvas-name");
    name.addEventListener("input", function (event) {
        name.value = event.target.value;
    });
    initializeCanvas(1);
    function downloadSVG(id) {
        var canvas = document.getElementById("newCanvas-".concat(id));
        var pngData = canvas.toDataURL("image/png");
        potrace.trace(pngData, function (err, svg) {
            if (err) throw err;
            var anchor = document.createElement("a");
            anchor.href = "data:image/svg+xml;base64," + btoa(svg);
            anchor.download = "".concat(name.value, ".svg");
            anchor.click();
        });
    }
    function downloadPNG(id) {
        var canvas = document.getElementById("newCanvas-".concat(id));
        var anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "".concat(name.value, ".png");
        anchor.click();
    }
    document.querySelectorAll(".download").forEach(function (element) {
        element.addEventListener("click", function (event) {
            var format = document.querySelector(
                'input[name="format"]:checked'
            ).value;
            if (format === "png") {
                downloadPNG(event.target.getAttribute("data-id"));
            } else if (format === "svg") {
                downloadSVG(event.target.getAttribute("data-id"));
            }
        });
    });
    document.querySelectorAll(".newCanvas").forEach(function (element) {
        var canvasHeightInput = document.getElementById("canvas-height").value;
        element.style.height = canvasHeightInput + "px";
    });
};
