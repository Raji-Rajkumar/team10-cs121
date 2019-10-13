# download the csv
# input: common name
# search for common name in the csv
# find data associated with that name
# find conservation status
# return conservation status

import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app)

@app.route("/name", methods = ['GET'])
def name():
    common = request.args.get('common')
    scientific = request.args.get('scientific')
    status = findStatus(common, scientific)
    return jsonify({ "status": status})


data = pd.read_csv('species.csv', encoding='utf-8')
data["Common Name"] = data["Common Name"].str.lower()
data["Scientific Name"] = data["Scientific Name"].str.lower()

def findStatus(commonName, scientificName):
    # search for row with common name/scientific name depending on what they gave us
    # extract status
    commonName = commonName.lower()
    scientificName = scientificName.lower()
    if commonName != "":
        if commonName not in data["Common Name"].values:
            # if not in database tell them
            return "The " + commonName + " is not in our database."
        # otherwise extract the status associated with that name
        return "The " + commonName + " is classified as " + data[data["Common Name"] == commonName]["Status"].values[0]
    elif scientificName != "":
        if scientificName not in data["Scientific Name"].values:
                # if not in database tell them
                return "The " + scientificName + " is not in our database."
        # otherwise extract the status associated with that name
        return "The " + scientificName + " is classified as " + data[data["Scientific Name"] == scientificName]["Status"].values[0]
    else:
        # no name was submitted
        return "Please enter a name!!"

if __name__ == '__main__':
    app.run()
