import json

def parse_input(input_text):
    characters = {}
    graph = {}
    statements = {}
    evidences = {}

    for s in input_text.split('\n'):
        if s == "":
            continue
        if 'victim' in s.lower():
            characters[s[s.index('(') + 1:-1]] = 'victim'
        elif 'suspect' in s.lower():
            characters[s[s.index('(') + 1:-1]] = 'suspect'
        elif 'crimescene' in s.lower():
            characters[s[s.index('(') + 1:-1]] = 'crimescene'
        elif 'witness' in s.lower():
            characters[s[s.index('(') + 1:-1]] = 'witness'
        elif 'connect' in s.lower():
            a_from, b_to, time, fact = s[s.index('(') + 1:-1].split(',')
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

    return mockGraphData

if __name__ == "__main__": 
    with open('input.txt', 'r') as file:
        input_text = file.read()
    result = parse_input(input_text)
    with open('output.json', 'w') as f:
        json.dump(result, f, indent=2)
    print(json.dumps(result, indent=2))