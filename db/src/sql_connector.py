import mysql.connector  # pip install mysql-connector-python
import sql_builder
import paths
import time

cnx = mysql.connector.connect(
    host="127.0.0.1",
    # host="db-service",
    port=3306,
    user="root",
    password="Pa$$w0rd",
)

if cnx.is_connected():
    print("Connected")

cursor = cnx.cursor()

queries = []

with open(paths.out + "/final.sql", "r") as f:
    queries.extend(f.read().split(";"))

for query in queries:
    if query.strip():
        cursor.execute(query)

cnx.commit()

cursor.execute("SELECT * FROM skill")
result = cursor.fetchall()
print("Skill data in the database:")
for row in result:
    print(row)

cursor.close()
cnx.close()
