import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodes,
  useEdges
} from "reactflow";
import "reactflow/dist/style.css";

import {
    nodes as initialNodes,
    edges as initialEdges
  } from "./inital-elements";

const OverviewFlow = () => {
  const [nodes, setNodes] = useNodes(initialNodes);
  const [edges, setEdges] = useEdges(initialEdges);
  const [listItem, setListItem] = useState(1);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onElementClick = (event, element) => {
    const selectedItem = element.data.label;
    const newChildId = `${selectedItem}-child${listItem}`;

    const newChildBlock = {
      id: newChildId,
      data: { label: selectedItem },
      position: { x: element.position.x + 200, y: element.position.y },
    };

    setNodes((prevNodes) => [...prevNodes, newChildBlock]);

    const newEdge = {
      id: `edge-${element.id}-${newChildId}`,
      source: element.id,
      target: newChildId,
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);

    setListItem((prevItem) => prevItem + 1);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onElementClick={onElementClick}
      fitView
      attributionPosition="top-right"
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return "#fff";
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
