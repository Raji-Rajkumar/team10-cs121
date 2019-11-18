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
    print("common: ", common)
    print("sci: ", scientific)
    status = findStatus(common, scientific)
    return jsonify({ "status": status})


data = pd.read_csv('species.csv', encoding='utf-8')
# make all letters lowercase to make it easier to search
data["Common Name"] = data["Common Name"].str.lower()
data["Scientific Name"] = data["Scientific Name"].str.lower()

def findStatus(commonName, scientificName):
    print("cN: ", commonName)
    print("sN: ", scientificName)
    # search for row with common name/scientific name depending on what they gave us
    # make all letters lowercase to make it easier to search
    commonName = commonName.lower()
    scientificName = scientificName.lower()
    if commonName != 'null':
        if commonName not in data["Common Name"].values:
            # find similar entries in the dataframe containing the inputted commonName
            possibilities = data.loc[data["Common Name"].str.contains(commonName), ["Common Name"]]
            # convert those into a string list of possible entries in the dataframe
            listP = possibilities["Common Name"].values.tolist()
            strP = ", ".join(listP)
            out = ""
            if len(listP) == 0:
                out = "The " + commonName + " is not in our database."
            else:
                out = "The " + commonName + " is not in our database. Did you mean " + strP + "?"
            # Let user know that the submitted entry is not in the database and offer alternatives
            return out
        # otherwise extract the status associated with that name
        return "The " + commonName + " is classified as " + data[data["Common Name"] == commonName]["Status"].values[0]
    elif scientificName != 'null':
        print("sN2", scientificName)
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
