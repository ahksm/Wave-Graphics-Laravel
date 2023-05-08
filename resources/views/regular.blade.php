<x-layout :random="$random">
    <div id="main-container">
        <div class="layer" id="layer-1">
            <div class="inputs">
                <h2>Wavelayer1</h2>
                <div class="input-form">
                    <label for="wave-length-1">Wave Length:</label>
                    <input type="number" id="wave-length-1" min="1" max="100" value="" step="1" />
                </div>
                <div class="input-form">
                    <label for="wave-height-1">Wave Height:</label>
                    <input type="number" id="wave-height-1" min="1" max="100" value=""
                        step="1" />
                </div>
                <div class="input-form">
                    <label for="wave-distortion-1">Wave Distortion:</label>
                    <input type="number" id="wave-distortion-1" min="1" max="100" value=""
                        step="1" />
                </div>
                <button class="download" data-id="1">Download</button>
                <button id="try-again" data-id="1">Try Again</button>
            </div>
            <canvas class="myCanvas" id="myCanvas-1"></canvas>
            <canvas class="newCanvas" id="newCanvas-1"></canvas>
        </div>
    </div>
    <button type="button" id="add-canvas">+ ADD WAVELAYER</button>
    </div>
    <script>
        document.getElementById('wave-length-1').value = Math.floor(Math.random() * 100) + 1;
        document.getElementById('wave-height-1').value = Math.floor(Math.random() * 100) + 1;
        document.getElementById('wave-distortion-1').value = Math.floor(Math.random() * 100) + 1;
    </script>
    <script src="{{ asset('js/regular.js') }}" defer></script>
    </body>

    </html>
</x-layout>
