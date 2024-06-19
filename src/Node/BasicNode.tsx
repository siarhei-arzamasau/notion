import {
  useRef,
  useEffect,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { NodeData } from "../utils/types";
import styles from "./Node.module.css";
import { nanoid } from "nanoid";

type BasicNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
  updateFocusedIndex(index: number): void;
  addNode(node: NodeData, index: number): void;
  removeNodebyIndex(index: number): void;
  changeNodeValue(index: number, value: string): void;
};

export const BasicNode = ({
  node,
  isFocused,
  index,
  updateFocusedIndex,
  addNode,
  removeNodebyIndex,
  changeNodeValue,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;

    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;

    if (event.key === "Enter") {
      event.preventDefault();

      if (target.textContent?.[0] === "/") {
        return;
      }

      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }

    if (event.key === "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodebyIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodebyIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <div
      ref={nodeRef}
      contentEditable
      suppressContentEditableWarning
      className={styles.node}
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    />
  );
};
