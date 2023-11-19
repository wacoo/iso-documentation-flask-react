import requests
import json
import os
import base64
import json

file_path = os.path.join('models', 'app.txt')

# Read the binary data from the file
with open(file_path, 'rb') as file:
    binary_data = file.read()

# Encode the binary data as Base64
base64_data = binary_data.decode('utf-8')

#Doc 1
# Define the data
# data = {
#     "doc_title": "Quality control",
#     "doc_description": "This is the revised draft.",
#     "revision_no": 3,
#     "category_id": "08d6f22e-b05f-47cf-8f19-da1dcc84d842",
#     "department_id": "418f73b8-5221-4d51-9ced-1b13618afcc3",
#     "doc_type": "txt",
#     "document": base64_data
# }

# # Set the API URL
# url = "http://127.0.0.1:5000/api/documents"

# # Set the headers
# headers = {
#     "Content-Type": "application/json"
# }

# # Convert the data to JSON
# json_data = json.dumps(data)

# # Send the POST request to create the document
# response = requests.post(url, data=json_data, headers=headers)

# # Print the response content
# print(response.content.decode('utf-8'))

#Doc 2
# Define the data
data2 = {
    "doc_title": "RECOH Maintenance Manual",
    "doc_description": "This is the revised draft.",
    "revision_no": 2,
    "category_id": "22eaecb0-fda4-4633-9fc7-cc9df76f1e37",
    "department_id": "69521069-c48e-4d96-94c8-6fb65a85bb29",
    "doc_type": "txt",
    "document": base64_data
}

# Set the API URL
url = "http://127.0.0.1:5000/api/documents"

# Set the headers
headers = {
    "Content-Type": "application/json"
}

# Convert the data to JSON
json_data = json.dumps(data2)

# Send the POST request to create the document
response = requests.post(url, data=json_data, headers=headers)

# Print the response content
print(response.content.decode('utf-8'))