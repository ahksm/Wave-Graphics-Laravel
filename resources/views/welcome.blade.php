<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wave Graphics</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #fff;
            color: #333;
            font-family: Arial, sans-serif;
            display: flex;
        }

        h2 {
            margin-bottom: 15px;
        }

        .sidebar {
            width: 15vw;
            background-color: #a4b6c2;
        }

        .container {
            padding: 30px;
            display: flex;
            flex-direction: column;
        }

        .main-inputs {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 30px;
        }

        .input-form {
            display: flex;
            align-items: center;
            width: 350px;
        }

        .myCanvas {
            display: none;
        }

        label {
            display: block;
            font-size: 1rem;
            width: 65%;
        }

        input[type="number"],
        input[type="text"],
        input[type="color"] {
            font-size: 1.2rem;
            border-radius: 0.3rem;
            border: none;
            background-color: #f4f4f4;
            margin-top: 0.5rem;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
            width: 100px;
        }

        input[type="number"]:focus,
        input[type="text"]:focus,
        input[type="color"]:focus {
            outline: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        button {
            background-color: #a4b6c2;
            color: #fff;
            padding: 0.5rem 1rem;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            margin: 10px 10px 10px 0px;
        }

        #add-canvas {
            color: black;
            font-size: 14px;
            font-weight: bold;
            width: 200px;
        }

        .layer {
            display: flex;
            gap: 30px;
            margin-bottom: 30px;
        }

        input[type="submit"]:hover {
            background-color: #222;
        }
    </style>
</head>

<body>
    <div class="sidebar">
        <form action="/logout" method="POST">
            @csrf
            <button type="submit" name="logout">Log Out</button>
        </form>
    </div>
    <div class="container">
        <h1>Generate Graphic Set</h1>
        <div class="main-inputs">
            <div class="input-form">
                <label for="canvas-name">Graphic Set Name:</label>
                <input type="text" id="canvas-name" value="myCanvas" />
            </div>
            <div class="input-form">
                <label>Size in Pixel</label>
                <div>
                    <input type="number" id="canvas-width" min="10" value="150" step="10" />
                    <label for="canvas-width" style="margin-top: 5px">Width</label>
                    <input type="number" id="canvas-height" min="10" value="150" step="10" />
                    <label for="canvas-height" style="margin-top: 5px; margin-bottom: 30px">Height</label>
                </div>
            </div>
            <div class="input-form">
                <label for="format">Format</label>
                <div style="display: flex">
                    <input type="radio" name="format" value="png" checked />
                    <label for="format" style="margin-left: 10px; margin-right: 10px">.png</label>
                    <input type="radio" name="format" value="svg" />
                    <label for="format" style="margin-left: 10px">.svg</label>
                </div>
            </div>
            <div class="input-form" style="margin-bottom: 30px">
                <label for="type">Type</label>
                <p>Wave graphics</p>
            </div>
        </div>
        <div id="main-container">
            <div class="layer" id="layer-1">
                <div class="inputs">
                    <h2>Wavelayer1</h2>
                    <div class="input-form">
                        <label for="wave-length-1">Wave Length:</label>
                        <input type="number" id="wave-length-1" value="0.01" step="0.001" />
                    </div>
                    <div class="input-form">
                        <label for="wave-height-1">Wave Height:</label>
                        <input type="number" id="wave-height-1" value="25" step="1" />
                    </div>
                    <div class="input-form">
                        <label for="wave-distortion-1">Wave Distortion:</label>
                        <input type="number" id="wave-distortion-1" value="50" step="1" />
                    </div>
                    <button class="download" data-id="1">Download</button>
                </div>
                <canvas class="myCanvas" id="myCanvas-1"></canvas>
                <canvas class="newCanvas" id="newCanvas-1"></canvas>
            </div>
        </div>
        <button type="button" id="add-canvas">+ ADD WAVELAYER</button>
        <div class="input-form">
            <label for="line-width">Line Thickness:</label>
            <input type="number" id="line-width" value="1" min="1" step="1" />
        </div>
        <div class="input-form">
            <label for="line-color">Line Color:</label>
            <input type="color" id="line-color" value="#000000" />
        </div>
        <div class="input-form" style="margin-bottom: 1rem">
            <label for="bg-color">Background Color:</label>
            <input type="color" id="bg-color" value="#ffffff" />
        </div>
    </div>
    <script src="{{ asset('js/index.js') }}" defer></script>
</body>

</html>
