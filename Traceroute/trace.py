import urllib2
import re
import json
import networkx as nx


# read in the file of IP addresses, including their enclosing parentheses
file = open('ip.txt', 'r')
ips = file.read()

# split them into a list by each line break
ip_list = ips.split('\n')

# remove the parentheses (the first and last characters of each item in the list)
ip_list_parsed = [ ip[1:-1] for ip in ip_list ]

def graph_add_node(n, g):
    n = n.lower()
    try:
        if g.has_node(n):
            g.node[n]['weight']+=1
        else:
            g.add_node(n)
            g.node[n]['label'] = n
            g.node[n]['weight'] = 1
    except:
        return
            
def graph_add_edge(n1, n2, g):
    if g.has_edge(n1, n2):
        g[n1][n2]['weight']+=1
    else:
        g.add_edge(n1,n2)
        g[n1][n2]['weight']=1

graph = nx.Graph()

all_data = []
cities = []

for ip in ip_list_parsed:
	response = urllib2.urlopen('http://freegeoip.net/json/' + ip)
	# parse = re.sub('\n','',response)
	data = json.load(response)
	all_data+=data

for d in all_data:
	if len(d['city']):
		cities+=d['city'] + ', '+ d['region_name']
	else:
		cities+=d['ip']

i=0
for c in cities:
	graph_add_node(c, graph)
	if i < (len(cities)-1):
		graph_add_edge(cities[i], cities[i+1])

# output file
q = 'traceroute'
nx.write_gexf(graph, '%s_graph.gexf' % q)
print '%s_graph.gexf' % q








