# download the csv
# input: common name
# search for common name in the csv
# find data associated with that name
# find conservation status
# return conservation status

import pandas as pd

data = pd.read_csv("species.csv")

def findStatus(commonName):
    # search for row with common name
    # extract status
    return data[data["Common Name"] == commonName]["Status"].values[0]

