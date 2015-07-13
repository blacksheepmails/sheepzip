
required_question_fields = {
    'question_id': '12',
    'group_id': '12',
}


def example_json_to_typed(example_json):
    out = {}
    
    for k, v in example_json.items():
        if isinstance(v, dict):
            out[k] = example_json_to_typed(v)
        else:    
            out[k] = type(v)
    return out


def is_valid_question(question):
    typed_fields = example_json_to_typed(required_question_fields)

    for k, v in typed_fields.items():
        if k not in question:
            return False
        
        if v == dict:
            # todo: handle dicts
            continue

        if not isinstance(question[k], v):
            return False

    return True


def filter_questions(questions):
    before = len(questions)
    questions = [question for question in questions if is_valid_question(question)]
    after = len(questions)

    if before != after:
        print('Warning, before there were ', before, 
            ' and after there were ', after, ' questions!')

    return questions


def all_questions(question_database):
    return question_database.find()

def jsonfied_questions(questions):
    cleaned_questions = []

    for question in questions:
        cleaned_questions.append({k:v for (k, v) in question.items() if k[0] != '_'})
    return cleaned_questions




def test_conversions():
    expected_output = {
        'question_id': str,
        'group_id': str
    }

    assert example_json_to_typed(required_question_fields) == expected_output


def test_file():
    test_conversions()

if __name__ == '__main__':
    test_file()