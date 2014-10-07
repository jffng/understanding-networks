
import json
from itertools import islice, chain


with open('locations.json') as f:
    for line in f:
        while True:
            try:
                jfile = json.loads(line)
                break
            except ValueError:
                # Not yet a complete JSON value
                line += next(f)

print json.dumps(jfile, indent = 1)