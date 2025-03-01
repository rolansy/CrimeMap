import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import mockGraphData from "./mockdata.js";

const graphData = mockGraphData;

// const graphData = {
//   vertices: [
//     ["v", "victim"],
//     ["s", "suspect", { statement: ["asdas", "sdasd"], evidence: ["link1", "link2"] }],
//     ["h", "crimescene"]
//   ],
//   edges: [
//     ["v", "s", { time: "17:00:00", facts: ["dhjasdhjas", "shajs"], assumptions: ["sdsxs", "dedw"] }]
//   ]
// };

const nodes = graphData.vertices.map(([id, type], index) => ({
  id,
  data: { label: `${id.toUpperCase()} (${type})` },
  position: { x: index * 200, y: 100 },
  style: {
    backgroundColor: type === "suspect" ? "red" : type === "victim" ? "blue" : "gray",
    color: "white",
    padding: "10px",
    borderRadius: type === "crimescene" ? "5px" : "50%",
    width: 100,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

// Map JSON edges to React Flow edges
const edges = graphData.edges.map(([source, target, details], index) => ({
  id: `edge-${index}`,
  source,
  target,
  label: `Time: ${details.time}\nFacts: ${details.facts.join(", ")}\nAssumptions: ${details.assumptions.join(", ")}`,
  style: { stroke: "black" },
  labelBgStyle: { fill: "white", padding: "4px", borderRadius: "5px" }
}));

const Board = () => {
  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center">
      <div className="w-[90%] h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Board;
