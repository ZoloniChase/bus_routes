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
        bus_num = request.args.get('bus_num') #request bus_num from html name attribute in the input field
        
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True) 
        
        sql = "SELECT start_lat, start_long, stop_lat, stop_long FROM bus_info WHERE bus_num = %s" #%s is a placeholder string depending on the input
        #sql stmt
        
        cursor.execute(sql, (bus_num,)) #executes the sql stmt and gets the input fron bus_num
        result = cursor.fetchone() #fetch one column
        
        if result: # if the number is there return the coordinates in json format
            return jsonify(result)
        else:
            return jsonify({"error": "No bus found"}), 404 #else return this
            
    #except Exception as e:
      #  print(f"Error: {e}")  # Log the error
       # return jsonify({"error": "Database error"}), 500
        
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)