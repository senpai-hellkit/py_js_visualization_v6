from flask import Flask, jsonify, render_template

from db import db


app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/get_data', methods=['GET', 'POST'])
def get_data():
    return jsonify(db.get_data())


if __name__ == '__main__':
    app.run(debug=True)