from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

def cargar_datos(estado):
    path = f"data/{estado}.csv"
    df = pd.read_csv(path)
    return df.to_dict(orient='list')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/datos/<estado>')
def datos(estado):
    try:
        data = cargar_datos(estado)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error: " "Archivo no encontrado"}), 404
    
if __name__ == '__main__':
    app.run(debug=True)
