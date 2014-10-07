import urllib
import re
import json

# read in the file of IP addresses, including their enclosing parentheses
file = open('ip.txt', 'r')
ips = file.read()

# split them into a list by each line break
ip_list = ips.split('\n')

# remove the parentheses (the first and last characters of each item in the list)
ip_list_parsed = [ ip[1:-1] for ip in ip_list ]

geolocations = []

for ip in ip_list_parsed:
	response = urllib.urlopen('http://freegeoip.net/json/67.59.228.45').read()
	print re.sub('\n',',',response)

