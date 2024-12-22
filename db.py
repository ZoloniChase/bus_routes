from flask import Flask
import mysql.connector

app = Flask(__name__)

# Database connection settings
config = {
  'user': 'root',
  'password': 'root_password',  # Update with the new password
  'host': 'localhost',
  #'port': '3307',
  'database': 'bus',
  'raise_on_warnings': True,
}

# Establish connection
def get_db_connection():
    return mysql.connector.connect(**config)


