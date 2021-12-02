"""
CIS 3368 Final Project Sprint 1

Team Members: 
    Mohammad Qureshi PSID: 1789301
    Nikolas Walker PSID: 1469899
"""

import flask
import random
from flask import jsonify
from flask import request, make_response
from sql import create_connection
from sql import execute_query
from mysql.connector import Error


app = flask.Flask(__name__) #  sets up the application
app.config["DEBUG"] = True #  allow to show errors in browser


@app.route('/user', methods=['POST']) 
def add_user():
    request_data = request.get_json()
    firstname = request_data['firstname']
    lastname = request_data['lastname']
    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    query = "INSERT INTO FinalProject.usertable (firstname, lastname) VALUES ('"+firstname+"','"+lastname+"')"
    # runs SQL code to allow data to be inserted into usertable for names
    execute_query(conn, query)
    return 'POST REQUEST WORKED'


@app.route('/user', methods=['GET'])
def show_user():
    if 'id' in request.args: #only if an id is provided as an argument will it proceed
        id = int(request.args['id'])
    else:
        return 'ERROR: No ID provided!'
    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    cursor = conn.cursor(dictionary=True)
    sql = "SELECT * FROM FinalProject.usertable where id = %s" %(id) # finds the user information for the id passed in

    cursor.execute(sql)
    rows = cursor.fetchall()
    results = []

    for user in rows:
        if user['id'] == id:
            results.append(user)
    return jsonify(results) # shows the results of the user id passed in with json formatting after iterating over its data

# gets the id for each set of names and saves them inot a list called results so they can be called and displayed together
# this allows for ?id=1 and other versions to be entered so the data saved can be displayed using the right key


@app.route('/user', methods=['PUT']) # this method allows for the users information to be updated
def update_user():
    request_data = request.get_json()
    userid = request_data['id']
    firstname = request_data['firstname']
    lastname = request_data['lastname']
    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    query = "UPDATE FinalProject.usertable SET firstname = '{}', lastname = '{}' WHERE id = '{}'".format(firstname, lastname, userid)
    execute_query(conn, query)
    return 'POST REQUEST WORKED'


@app.route('/user/restaurantlist', methods=['POST']) # requests the data for resturants to be entered in json format
def add_restaurant():
    request_data = request.get_json()
    userid = request_data['user_id']
    restaurant1 = request_data['restaurant1']
    restaurant2 = request_data['restaurant2']
    restaurant3 = request_data['restaurant3']
    restaurant4 = request_data['restaurant4']
    restaurant5 = request_data['restaurant5']
    restaurant6 = request_data['restaurant6']
    restaurant7 = request_data['restaurant7']
    restaurant8 = request_data['restaurant8']
    restaurant9 = request_data['restaurant9']
    restaurant10 = request_data['restaurant10']
    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    query = "INSERT INTO FinalProject.restauranttable (user_id, restaurant1, restaurant2, restaurant3, restaurant4, restaurant5, restaurant6, restaurant7, restaurant8, restaurant9, restaurant10) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}')".format(userid, restaurant1, restaurant2, restaurant3, restaurant4, restaurant5, restaurant6, restaurant7, restaurant8, restaurant9, restaurant10)
    execute_query(conn, query) # executes the SQL insertion query for the data to be saved into the resturanttable table
    return 'POST REQUEST WORKED'

#  though long this is establishing the connection for an id to be assigned and the restaurants to be put together for 1 person


@app.route('/user/restaurantlist', methods=['GET'])
def show_restaurant():
    if 'user_id' in request.args: #  only if an id is provided as an argument, proceed
        user_id = int(request.args['user_id'])
    else:
        return 'ERROR: No ID provided!'
    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    cursor = conn.cursor(dictionary=True)
    sql = "SELECT * FROM FinalProject.restauranttable where user_id = %s" %(user_id)

    cursor.execute(sql)
    rows = cursor.fetchall()
    results = []  # list to store all the values form restauranttable by id

    for user in rows:
        if user['user_id'] == user_id:
            results.append(user)
    return jsonify(results)
# much like the one for user an id is retrieved and stored into the list so it can be dsiplaeyd with the right key


@app.route('/update/restaurantlist', methods=['PUT'])
def update_restaurantlist():
    request_data = request.get_json()
    userid = request_data['user_id']
    restaurant1 = request_data['restaurant1']
    restaurant2 = request_data['restaurant2']
    restaurant3 = request_data['restaurant3']
    restaurant4 = request_data['restaurant4']
    restaurant5 = request_data['restaurant5']
    restaurant6 = request_data['restaurant6']
    restaurant7 = request_data['restaurant7']
    restaurant8 = request_data['restaurant8']
    restaurant9 = request_data['restaurant9']
    restaurant10 = request_data['restaurant10']
    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    query = "UPDATE FinalProject.restauranttable SET id = '{}', restaurant1 = '{}', restaurant2 ='{}', restaurant3 ='{}', restaurant4 ='{}', restaurant5 ='{}', restaurant6 ='{}', restaurant7 ='{}', restaurant8 ='{}', restaurant9 ='{}', restaurant10 ='{}'".format(userid, restaurant1, restaurant2, restaurant3, restaurant4, restaurant5, restaurant6, restaurant7, restaurant8, restaurant9, restaurant10)
    # runs the SQL command for updating a tables values for resturant names 
    execute_query(conn, query)
    return 'POST REQUEST WORKED'


@app.route('/randomrestaurant', methods=['GET'])
def get_randomrestaurant():
    if 'user_ids' in request.args:
        user_ids = [int(x.strip()) for x in request.args['user_ids'].split(',')] # add api parameters into a list called 'user_ids' using a for loop. Add commas between each parameter. 
    else:
        return "ERROR: No User ID provided!" # return error if no 'user_ids' are provided

    conn = create_connection("cis3368.c9cmn090gmpt.us-east-2.rds.amazonaws.com", "admin", "cis3368database", "cis3368fall21")
    cursor = conn.cursor(dictionary=True)
    if len(user_ids) == 1:
        t = "('{}')".format(user_ids[0]) #if only 1 user is entered into the api, make t equal to the user_id in parenthesis for the SQL statement
        #t = user_ids[0]
    else:
        t = tuple(user_ids) # if more than 1 user is entered, turn the list into a tuple that equals t. This allows us to enter our parameters into the SQL statement with parenthesis.

    sql = "SELECT * FROM FinalProject.restauranttable where user_id IN {}".format(t) # get back a table with only the users entered using the variable t.
    cursor.execute(sql) # execute the query
    rows = cursor.fetchall() 

    all_user_restaurants = [] # create an empty list to add all user restaurants
    restaurant_data = [] # list to remove id

    for r in rows:  # remove id and user_id from the SELECT query list
        if r != 'id' and r != 'user_id': #loop through each item in rows and only append items in the list that are restaurants.
         restaurant_data.append(r)

    for restaurants in restaurant_data: # loop through each restaurant in the restaurant_data list
        all_user_restaurants+= restaurants.values() # add each restaurant value to the empty list created above(all_user_restaurants). This removes the key value from the dictionary in the restaurant_data list.
    return jsonify({"random_restaurant":random.choice(all_user_restaurants)}) #return one restaurant using random import from the list.

app.run()
# this is needed for the app route commands to run
