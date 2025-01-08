from flask import Flask, jsonify, render_template, request
from db import get_db_connection

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")
"""""
@app.route('/db')
def test_db():
    try:
        conn = get_db_connection()
        conn.ping()
        conn.close()
        return "Connected"
    except Exception as e:
        return f"Database connection failed: {e}"
        """
        
@app.route("/bus_info", methods=['GET'])
def query():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True) 
        
        sql = "SELECT start_lat, start_long, stop_lat, stop_long FROM bus_info" #%s is a placeholder string depending on the input
        #sql stmt
        
        cursor.execute(sql) #executes the sql statement
        result = cursor.fetchall() #fetch all columns
        
        if result: # if the number is there return the coordinates in json format
            return jsonify(result)
        else:
            return jsonify({"error": "No bus found"}), 404 #else return this
            
    
        
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)