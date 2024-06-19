import { nanoid } from "nanoid";
import { useFocusedNodeIndex } from "../hooks/useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher";
import { Title } from "./Title";
import { useAppState } from "../state/AppStateContext";

import styles from "./Page.module.css";

export const Page = () => {
  const { title, nodes, addNode, setTitle } = useAppState();
  const [focusedNodeIndex, setFocusedNodeInex] = useFocusedNodeIndex({ nodes });

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={index}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeInex}
            index={index}
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
