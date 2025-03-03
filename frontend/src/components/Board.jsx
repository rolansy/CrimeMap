import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, addEdge, MiniMap, applyNodeChanges, applyEdgeChanges, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { mockGraphData2 } from "./mockdata.js";

const graphData = mockGraphData2;

const initialNodes = graphData.vertices.map(([id, type, details], index) => ({
  id,
  data: { label: `${id.toUpperCase()}`, details },
  position: { x: index * 200, y: 100 },
  style: {
    backgroundColor: type === "suspect" ? "red" : type === "victim" ? "blue" : type === "witness" ? "green" : "gray",
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
  label: `${details.facts.join(", ")} at ${details.time}`,
  style: { stroke: "black" },
  labelBgStyle: { fill: "white", padding: "4px", borderRadius: "5px" }
}));

const Board = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [inputText, setInputText] = useState('');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

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

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputText }),
      });
      const data = await response.json();
      const newNodes = data.vertices.map(([id, type, details], index) => ({
        id,
        data: { label: `${id.toUpperCase()}`, details },
        position: { x: index * 200, y: 100 },
        style: {
          backgroundColor: type === "suspect" ? "red" : type === "victim" ? "blue" : type === "witness" ? "green" : "gray",
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

      const statementNodes = [];
      const statementEdges = [];

      data.vertices.forEach(([id, details], index) => {
        if (details && details.statement) {
          details.statement.forEach((statement, statementIndex) => {
            const statementNodeId = `${id}-statement-${statementIndex}`;
            statementNodes.push({
              id: statementNodeId,
              data: { label: statement },
              position: { x: index * 200 + 70, y: 100 + statementIndex * 20 },
              style: {
                backgroundColor: "yellow",
                color: "black",
                padding: "5px",
                borderRadius: "5px",
                width: "auto",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }
            });
            statementEdges.push({
              id: `edge-${id}-statement-${statementIndex}`,
              source: id,
              target: statementNodeId,
              style: { stroke: "black" }
            });
          });
        }
      });

      const newEdges = data.edges.map(([source, target, details], index) => ({
        id: `edge-${index}`,
        source,
        target,
        label: `${details.facts.join(", ")} at ${details.time}`,
        style: { stroke: "black" },
        labelBgStyle: { fill: "white", padding: "4px", borderRadius: "5px" }
      }));

      setNodes([...newNodes, ...statementNodes]);
      setEdges([...newEdges, ...statementEdges]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    setHistory([...history, { nodes, edges }]);
    setRedoStack([]);
  };

  const deleteSelected = () => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const selectedEdges = edges.filter((edge) => edge.selected);

    if (selectedNodes.length > 0 || selectedEdges.length > 0) {
      setNodes((nds) => nds.filter((node) => !node.selected));
      setEdges((eds) => eds.filter((edge) => !edge.selected));
      setHistory([...history, { nodes, edges }]);
      setRedoStack([]);
    }
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setRedoStack([...redoStack, { nodes, edges }]);
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setHistory([...history, { nodes, edges }]);
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  };

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text here"
          className="mb-4 p-2 w-[90%] h-[100px] bg-white rounded"
          style={{ resize: "none" }}
        />
        <div className="flex space-x-4 mb-4">
          <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">Submit</button>
          <button onClick={addNode} className="p-2 bg-blue-500 text-white rounded">Add Node</button>
          <button onClick={deleteSelected} className="p-2 bg-red-500 text-white rounded">Delete Selected</button>
          <button onClick={undo} className="p-2 bg-yellow-500 text-white rounded">Undo</button>
          <button onClick={redo} className="p-2 bg-green-500 text-white rounded">Redo</button>
        </div>
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
    </ReactFlowProvider>
  );
};

export default Board;