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
  
  export default mockGraphData;
  