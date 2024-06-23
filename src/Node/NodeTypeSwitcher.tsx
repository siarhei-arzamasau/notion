import { NodeData, NodeType } from '../utils/types';
import { BasicNode } from './BasicNode';
import { PageNode } from './PageNode';

type NodeTypeSwitcherProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
  updateFocusedIndex(index: number): void;
};

const TEXT_NODE_TYPES: NodeType[] = [
  'text',
  'list',
  'heading1',
  'heading2',
  'heading3',
];

export const NodeTypeSwitcher = ({
  node,
  isFocused,
  index,
  updateFocusedIndex,
}: NodeTypeSwitcherProps) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocusedIndex={updateFocusedIndex}
      />
    );
  }

  if (node.type === 'page') {
    return <PageNode node={node} index={index} isFocused={isFocused} />;
  }

  return null;
};
