import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ item }) => {
  return (
    <ul>
      {item.checklist.map((task, index) => (
        <SortableItem
          key={`item-${task.text}`}
          index={index}
          data={{ task, taskId: index, checklistId: item.id }}
        />
      ))}
    </ul>
  );
});

export default SortableList;
