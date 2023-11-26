from flask import Blueprint, Flask, jsonify, request, current_app
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from models.users import User
from sqlalchemy.orm import sessionmaker
from models.base import engine
from flask_bcrypt import Bcrypt

Session = sessionmaker(bind=engine)
session = Session()

auth_ap = Blueprint('auth_api', __name__)

bcrypt = Bcrypt()

@auth_ap.route('/', methods=['GET'], strict_slashes=False)
def auth_home():
    all = session.query(User).all()
    users = []
    for user in all:
        users.append({'first_name': user.first_name, 'middle_name': user.middle_name,
                        'last_name':user.last_name, 'username': user.username,
                        'access_level': user.access_level, 'active': user.active})
    return jsonify(users)

@auth_ap.route('/get/<int:uname>', methods=['GET'], strict_slashes=False)
def get_user(uname):
    'return user basic info'
    #uname = request.args.get('username')
    user = session.query(User).filter_by(username=uname).first()
    return jsonify({'first_name': user.first_name, 'middle_name': user.middle_name, 'last_name':user.last_name, 'username': user.username, 'access_level': user.access_level, 'active': user.active})

@auth_ap.route('/login', methods=['POST'], strict_slashes=False)
def login():# if username in user.__dict__ and users[username] == password:
    #     access_token = create_access_token(identity=username)
    #     return jsonify(access_token=access_token), 200
    # else:
    #     return jsonify({ "message": "Invalid username orpassword" }), 401

    'return user basic info'
    data = request.get_json()

    username = data['username']
    password = data['password']
    user = session.query(User).filter_by(username=username).first()
    print(user.__dict__)
    is_valid = bcrypt.check_password_hash(user.password, password)
    if user is not None and 'password' in user.__dict__ and is_valid:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({ "message": "Invalid username or password" }), 401

@auth_ap.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'logged_in_as': current_user}), 200

@auth_ap.route('/register', methods=['POST'], strict_slashes=False)
def register():
    data = request.get_json()
    uname = data['username']
    pword = data['password']
    fname = data['first_name']
    mname = data['middle_name']
    lname = data['last_name']
    access_level = data['access_level']
    active = data['active']
    try:
        existing_user = session.query(User).filter_by(username=uname).first()
        if existing_user:
            return jsonify({'message': 'Username already exists'}), 400
        else:
            print(2222)
            hashed_password = bcrypt.generate_password_hash(pword).decode('utf-8')
            print(1111, str(hashed_password))
            user = User(username = uname, password = hashed_password, first_name=fname, middle_name=mname, last_name=lname, access_level=access_level, active=active)
            session.add(user)
            session.commit()
            return jsonify({'message': 'User created successfully', 'result': {'id': user.id, 'username': user.username, 'first_name': user.first_name, 'middle_name': user.middle_name, 'last_name': user.last_name, 'access_level': user.access_level, 'active': active}}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': 'User not created! ' + str(e)}), 500