import { useState } from "react";
import { NodeData } from "../utils/types";
import { useFocusedNodeIndex } from "../hooks/useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { BasicNode } from "../Node/BasicNode";
import { Title } from "./Title";
import { nanoid } from "nanoid";
import styles from "./Page.module.css";

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState("Default Title");
  const [focusedNodeIndex, setFocusedNodeInex] = useFocusedNodeIndex({ nodes });

  const addNode = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={index}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeInex}
            index={index}
            addNode={addNode}
            removeNodebyIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={nodes.length === 0}
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
        />
      </div>
    </>
  );
};
