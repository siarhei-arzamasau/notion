import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { NodeData } from "../utils/types";
import styles from "./NodeContainer.module.css";

import { NodeTypeSwitcher } from "./NodeTypeSwitcher";

type NodeContainerProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
  updateFocusedIndex(index: number): void;
};

export const NodeContainer = ({
  node,
  index,
  isFocused,
  updateFocusedIndex,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocusedIndex={updateFocusedIndex}
      />
    </div>
  );
};
