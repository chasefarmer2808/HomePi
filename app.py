import os
import RPi.GPIO as GPIO
from flask import Flask, send_from_directory, request, abort, jsonify
from flask_cors import CORS

redPin = 13
greenPin = 19
bluePin = 26

# Init GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(redPin, GPIO.OUT)
GPIO.setup(greenPin, GPIO.OUT)
GPIO.setup(bluePin, GPIO.OUT)

app = Flask(__name__, static_folder='public/build')
CORS(app)

led = {
    'status': False,
    'r': False,
    'g': False,
    'b': False
}


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
        # Return LED state.
        return jsonify(led)

    if request.method == 'PUT':
        if 'status' in request.json:
            newStatus = request.json['status']

            if newStatus != led['status']:
                # Toggle LED on or off.

                if newStatus:
                    enable_led()
                else:
                    disable_led()

                led['status'] = newStatus

        if led['status']:
            # Update the LED color.
            if 'r' in request.json:
                led['r'] = update_led_pin(redPin, request.json['r'])
            if 'g' in request.json:
                led['g'] = update_led_pin(greenPin, request.json['g'])
            if 'b' in request.json:
                led['b'] = update_led_pin(bluePin, request.json['b'])

        return jsonify(led)


def enable_led():
    print(led)
    GPIO.output(redPin, GPIO.HIGH) if led['r'] else GPIO.output(
        redPin, GPIO.LOW)
    GPIO.output(greenPin, GPIO.HIGH) if led['g'] else GPIO.output(
        greenPin, GPIO.LOW)
    GPIO.output(bluePin, GPIO.HIGH) if led['b'] else GPIO.output(
        bluePin, GPIO.LOW)


def disable_led():
    GPIO.output(redPin, GPIO.LOW)
    GPIO.output(greenPin, GPIO.LOW)
    GPIO.output(bluePin, GPIO.LOW)


def update_led_pin(pin, data):
    if data:
        GPIO.output(pin, GPIO.HIGH)
    else:
        GPIO.output(pin, GPIO.LOW)

    return data


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
