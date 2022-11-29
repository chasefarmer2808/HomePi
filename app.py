import os
from flask import Flask, send_from_directory, request, abort

app = Flask(__name__, static_folder='public/build')

led = False


@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/led', methods=['GET', 'PUT'])
def update_led():
    global led

    if request.method == 'GET':
        # Toggle LED
        led = not led
        return str(led)

    if request.method == 'PUT':
        # Make sure LED is on.
        if not led:
            abort(403)

        r = request.json['r']
        g = request.json['g']
        b = request.json['b']

        return f'setting LED to r:{r} g:{g} b:{b}'


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
