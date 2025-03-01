import json

characters = {}
graph = {}
statements = {}
evidences = {}

while True:
    s = input("Enter Markup : ")
    if s=="":
        break
    if 'victim' in s.lower():
        characters[s[s.index('(') + 1:-1]] = 'victim'
    elif 'suspect' in s.lower():
        characters[s[s.index('(') + 1:-1]] = 'suspect'
    elif 'crimescene' in s.lower():
        characters[s[s.index('(') + 1:-1]] = 'crimescene'
    elif 'witness' in s.lower():
        characters[s[s.index('(') + 1:-1]] = 'witness'
    elif 'connect' in s.lower():
        a_from, b_to, time, fact = s[s.index('(') + 1:-1].split(',')  # a_from and b_to are vertices and the f is the edge
        if (a_from, b_to) in graph:
            graph[a_from, b_to].append({fact: time})
        else:
            graph[a_from, b_to] = [{fact: time}]
    elif 'statement' in s.lower():
        character, statement = s[s.index('(') + 1:-1].split(',')
        if character in statements:
            statements[character].append(statement)
        else:
            statements[character] = [statement]
    elif 'evidence' in s.lower():
        character, evidence = s[s.index('(') + 1:-1].split(',')
        if character in evidences:
            evidences[character].append(evidence)
        else:
            evidences[character] = [evidence]

    print(characters)
    print(graph)
    print(statements)
    print(evidences)

    # Construct the JSON structure
    vertices = []
    for character, role in characters.items():
        vertex = [character, role]
        if character in statements or character in evidences:
            details = {}
            if character in statements:
                details['statement'] = statements[character]
            if character in evidences:
                details['evidence'] = evidences[character]
            vertex.append(details)
        vertices.append(vertex)

    edges = []
    for (a_from, b_to), facts in graph.items():
        edge = [a_from, b_to]
        details = {'facts': [], 'time': None}
        for fact in facts:
            for key, value in fact.items():
                details['facts'].append(key)
                details['time'] = value
        edge.append(details)
        edges.append(edge)

    mockGraphData = {
        'vertices': vertices,
        'edges': edges
    }

    with open('output.json', 'w') as f:
        json.dump(mockGraphData, f, indent=2)

    print(json.dumps(mockGraphData, indent=2))