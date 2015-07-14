from flask import Flask, request, jsonify

import time, sys, random, json

app = Flask(__name__)
random.seed(time.time())
server_time = str(int(time.time()))
user_file = "data/users" + server_time + ".txt"
response_file = "data/responses" + server_time + ".txt"

with open(user_file, 'w') as datafile:
    datafile.write('gender,age,name,language,user_id\n')

with open(response_file, 'w') as datafile:
    datafile.write('user_id,solution_id,response,question_id\n')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    with open("sps/sample_questions.json") as data:
    	questions = json.load(data)
    return jsonify(questions)    

@app.route('/api/response', methods=['POST'])
def save_response():
    response = request.get_json()
    with open(response_file, "a") as datafile:
        datafile.write(csv(response) + '\n')
    return ''

@app.route('/api/user', methods=['POST'])
def create_user():
    user = request.get_json()
    uid = random.randint(0, sys.maxsize)
    user['id'] = str(uid)
    with open(user_file, "a") as datafile:
        datafile.write(csv(user) + '\n')
    return jsonify({'id': uid})

def csv(thing):
    output=''
    for key in thing:
        output += thing[key] + ','
    return output[:-1]

if __name__ == '__main__':
    app.run(debug=True)
