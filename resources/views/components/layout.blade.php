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
            text-decoration: none;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 12vw;
            background-color: #a4b6c2;
            min-height: 100vh;
        }

        .sidebar a {
            width: 100%;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            padding: 20px 0px;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
        }

        .container {
            padding: 30px;
            display: flex;
            flex-direction: column;
        }

        .main-inputs {
            display: flex;
            gap: 100px;
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

        #main-container {
            position: relative;
        }

        .loader {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translateX(-20px);
            z-index: 9999;
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(5px);
            display: none;
        }

        .loader:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-top: 3px solid #333;
            border-right: 3px solid transparent;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>
    <div class="sidebar">
        <img style="width: 80px; height: 80px; margin: 20px 30px"
            src="/storage/photo_2023-04-17_13-50-31-removebg-preview.png" alt="alt">
        <form action="/logout" method="POST">
            @csrf
            <button
                style="position: fixed; 
                        top: 10px; 
                        right: 10px;
                        background-color: #a4b6c2;
                        color: #fff;
                        padding: 0.5rem 1rem;
                        border: none;
                        font-size: 1.2rem;
                        cursor: pointer;"
                type="submit" name="logout">Log Out</button>
        </form>
        <a href="/">Single</a>
        <a href="/random">Random</a>
    </div>
    <div class="container">
        <h1>Generate Graphic Set</h1>
        <div class="main-inputs">
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div class="input-form">
                    <label for="canvas-name">Graphic Set Name:</label>
                    <input type="text" id="canvas-name" value="myCanvas" />
                </div>
                <div class="input-form">
                    <label>Size in Pixel</label>
                    <div>
                        <input type="number" id="canvas-width" min="10" value="300" step="10" />
                        <label for="canvas-width" style="margin-top: 5px">Width</label>
                        <input type="number" id="canvas-height" min="10" value="300" step="10" />
                        <label for="canvas-height" style="margin-top: 5px; margin-bottom: 30px">Height</label>
                    </div>
                </div>
                <div class="input-form">
                    <label for="canvas-name">Number of graphics:</label>
                    <input type="number" id="graphics-number" min="1" max="100" value="2" />
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
            <div style="display: flex; flex-direction: column; gap: 20px;">
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
        </div>
        {{ $slot }}
