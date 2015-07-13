# lego-starwars


# Server

To run server for first time:
- cd server
- python setup.py install --user
- python sps/main.py deploy

If you want to wipe the data, ensure you have the "deploy flag" for main.py.
Otherwise, leave "deploy" out and no data will be wiped.


## Requests

### /questions

- GET request
- responds with 

/questions

```
{
  "questions": [
    {
      "group_id": "1",
      "properties": {
        "classes": "",
        "image": "zip_hi.png",
        "text": "Zip says hi"
      },
      "question_id": "1"
    },
    {
      "group_id": "1",
      "properties": {
        "classes": "",
        "image": "zip_bye.png",
        "text": "Zip says goodbye"
      },
      "question_id": "2"
    }
  ]
}
```

### /question/:question_id

- GET request
- question id should be id of wanted question

request /question/345678 (no such question)

```
{
  "questions": []
}
```

### /group/<group_id>

- GET request
- group id should be id of wanted group

request /group/0 (no such question)

```
{
  "questions": []
}
```

request /group/1

```
{
  "questions": [
    {
      "group_id": "1",
      "properties": {
        "classes": "",
        "image": "zip_hi.png",
        "text": "Zip says hi"
      },
      "question_id": "1"
    },
    {
      "group_id": "1",
      "properties": {
        "classes": "",
        "image": "zip_bye.png",
        "text": "Zip says goodbye"
      },
      "question_id": "2"
    }
  ]
}
```

#JSON stuff

## item
item is the most base element. Groups, questions, instructions are made up from item.
items by default have:
- text for the display text
- image for the display image
- classes for css classes to be applied (to handle the funky text placements etc)

```
{
    "text": "Doggy",
    "image": "face.png",
    "classes": "nolink intro orange-background",
}
```

## user

users by default have:
- name as string 
- age as number
- gender as string

```
{
    "name": "Peter buckling"
    "age": 5,
    "gender": "male"
}
```

## group 
A group is the setup for a scenario. In powerpoint they are the pages with the numbers on
groups have
- group ids as string (may want strings later)
- properties as {{item}}

```
{
    "group_id": "1"
    "properties" 
}
```


## question
question is expecting response
questions have
- group id as string
- question id as string
- properties as {{item}}

```
{
    "group_id": "1", 
    "question_id": "124",
    "properties": {{item}}
}
```


## response
    response is from user

    responses have:
- group_id as string
- question_id as string
- face as number between -1 and 1
    - 1 is for :)
    - 0 is for :|
    - -1 is for :(
- user as {{user}}

```
{
    "group_id": "1",
    "question_id": "124",
    "face": 1,
    "user": {{user}}
}
```
