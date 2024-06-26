import { nanoid } from 'nanoid';
import { useFocusedNodeIndex } from '../hooks/useFocusedNodeIndex';
import { Cover } from './Cover';
import { Spacer } from './Spacer';
import { Title } from './Title';
import { NodeContainer } from '../Node/NodeContainer';
import { useAppState } from '../state/AppStateContext';
import { DndContext, DragOverlay, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const Page = () => {
  const {
    title,
    nodes,
    cover,
    setCoverImage,
    addNode,
    setTitle,
    reorderNodes,
  } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <>
      <Cover filePath={cover} changePageCover={setCoverImage} />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={index}
                node={node}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
        <Spacer
          showHint={nodes.length === 0}
          handleClick={() => {
            addNode({ type: 'text', value: '', id: nanoid() }, nodes.length);
          }}
        />
      </div>
    </>
  );
};
