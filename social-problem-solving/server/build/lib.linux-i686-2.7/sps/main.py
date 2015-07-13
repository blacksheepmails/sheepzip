from flask import Flask, request, jsonify
from pymongo import MongoClient

from json import loads, dumps
from sps.questions import filter_questions, all_questions, jsonfied_questions

import sys


client = MongoClient()

sps_database = client.sps_data
questions = sps_database.questions
responses = sps_database.responses
app = Flask(__name__)

def create_questions():
    questions.remove()

    with open('sps/sample_questions.json') as f:
        data = f.read()
    
    data = loads(data)

    _questions = filter_questions(data['questions'])
    questions.insert_many(_questions)



@app.route('/questions', methods=['GET'])
def get_questions():
    data = {
        'questions': jsonfied_questions(all_questions(questions))
    }

    return jsonify(data)

@app.route('/group/<group_id>')
def get_group_questions(group_id):
    cases = questions.find({'group_id': group_id})

    data = {
        'questions': jsonfied_questions(cases)
    }

    return jsonify(data)

@app.route('/question/<question_id>')
def get_question_by_id_questions(question_id):
    cases = questions.find({'question_id': question_id})

    data = {
        'questions': jsonfied_questions(cases)
    }

    return jsonify(data)

@app.route('/save', methods=['POST'])
def save_response():
    """ Saves the json data """
    data = request.get_json()
    id = questions.insert_one(post).inserted_id
    print('id', id)
    return id

if __name__ == '__main__':
    if "deploy" in sys.argv:
        create_questions()

    app.run(debug=True)