const mockGraphData = {
    vertices: [
      ["v", "victim"],
      ["s", "suspect", { statement: ["Theft", "Fraud"], evidence: ["video_link", "document"] }],
      ["h", "crimescene"]
    ],
    edges: [
      ["v", "s", { time: "12:30 PM", facts: ["Seen together", "Argument happened"], assumptions: ["Possible theft", "Money dispute"] }]
    ]
  };
  
  export { mockGraphData };
  

  const mockGraphData2 = {
    vertices: [
      ["v", "victim", { statement: ["No statement (Deceased)"] }],  
      ["s1", "suspect", { statement: ["I was at home watching TV at the time of the incident."], evidence: ["Fingerprint on weapon", "Bloodstain on shirt", "CCTV footage near crime scene"] }],
      ["s2", "suspect", { statement: ["I don’t know anything about this. I wasn’t even near the crime scene."], evidence: [] }],
      ["w", "witness", { statement: ["I saw one of the suspects running away from the crime scene."] }],
      ["c", "crime scene", { statement: ["A kitchen with broken glass and a bloody knife found near the body."] }]
    ],
    edges: [
      ["v", "s1", { time: "10:45 PM", facts: ["Suspect's fingerprint found on weapon", "Blood on suspect’s shirt"], assumptions: ["Possible struggle", "Attempt to clean evidence"] }],
      ["v", "s2", { time: "10:45 PM", facts: ["No direct evidence against suspect"], assumptions: ["Could be an accomplice", "Might have had a different role"] }],
      ["w", "s1", { time: "11:00 PM", facts: ["Witness saw someone running away"], assumptions: ["Could be suspect trying to escape"] }],
      ["w", "s2", { time: "11:00 PM", facts: ["Witness did not confirm second suspect's presence"], assumptions: ["Might be uninvolved or covering tracks"] }],
      ["c", "v", { time: "10:30 PM", facts: ["Victim found near the kitchen", "Murder weapon found close by"], assumptions: ["Crime happened in a short window of time", "Victim knew the attacker"] }]
    ]
  };
  
  export { mockGraphData2 };
  