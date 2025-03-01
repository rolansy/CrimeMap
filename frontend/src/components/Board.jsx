import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, addEdge, MiniMap, Handle, applyNodeChanges, applyEdgeChanges } from "reactflow";
import "reactflow/dist/style.css";
import {mockGraphData} from "./mockdata.js";

const graphData = mockGraphData;

const initialNodes = graphData.vertices.map(([id, type], index) => ({
    id,
    data: { label: `${id.toUpperCase()}` },
    position: { x: index * 200, y: 100 },
    style: {
        backgroundColor: type === "suspect" ? "red" : type === "victim" ? "blue" : type === "witness" ? "yellow" : "gray",
        color: "white",
        padding: "10px",
        borderRadius: type === "crimescene" ? "5px" : "50%",
        width: 60,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const initialEdges = graphData.edges.map(([source, target, details], index) => ({
    id: `edge-${index}`,
    source,
    target,
    label: `Time, Facts, Assumptions`,
    data: { title: `Time: ${details.time}\nFacts: ${details.facts.join(", ")}\nAssumptions: ${details.assumptions.join(", ")}` },
    style: { stroke: "black" },
    labelBgStyle: { fill: "white", padding: "4px", borderRadius: "5px" }
}));

const Board = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: {
        backgroundColor: "gray",
        color: "white",
        padding: "10px",
        borderRadius: "50%",
        width: 60,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
      <button onClick={addNode} className="mb-4 p-2 bg-blue-500 text-white rounded">Add Node</button>
      <div className="w-[90%] h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Board;
