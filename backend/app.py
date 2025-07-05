from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from steg_image import encode_message, decode_message
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route("/hide", methods=["POST"])
def hide():
    # expects 'file' (image) and 'message'
    f = request.files.get("file")
    msg = request.form.get("message", "")
    if not f or not msg:
        return jsonify({"error": "File and message required"}), 400
    try:
        encoded_img = encode_message(f, msg)
        buf = BytesIO()
        encoded_img.save(buf, format="PNG")
        buf.seek(0)
        return send_file(buf, mimetype="image/png", as_attachment=True, download_name="steg_image.png")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/extract", methods=["POST"])
def extract():
    f = request.files.get("file")
    if not f:
        return jsonify({"error": "File required"}), 400
    try:
        message = decode_message(f)
        return jsonify({"message": message})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
