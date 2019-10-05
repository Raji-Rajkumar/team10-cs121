# download the csv
# input: common name
# search for common name in the csv
# find data associated with that name
# find conservation status
# return conservation status

import pandas as pd

data = pd.read_csv("mammals.csv")

data.head()
