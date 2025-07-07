from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import parse_input

app = Flask(__name__)
CORS(app, origins="http://localhost:5173","https://crime-map-one.vercel.app")

@app.route('/parse', methods=['POST'])
def parse():
    input_data = request.json.get('input', '')
    result = parse_input(input_data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')