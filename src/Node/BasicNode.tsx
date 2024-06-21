import {
  useRef,
  useEffect,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { CommandPanel } from "./CommandPanel";
import { NodeData, NodeType } from "../utils/types";
import styles from "./Node.module.css";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import cx from "classnames";

type BasicNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
  updateFocusedIndex(index: number): void;
};

export const BasicNode = ({
  node,
  isFocused,
  index,
  updateFocusedIndex,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { changeNodeValue, changeNodeType, removeNodeByIndex, addNode } =
    useAppState();

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

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

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
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel
          selectItem={parseCommand}
          nodeText={node.value}
        ></CommandPanel>
      )}
      <div
        ref={nodeRef}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
