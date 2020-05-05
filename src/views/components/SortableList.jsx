import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ item }) => {
  return (
    <ul>
      {item.tasks.map((task, index) => (
        <SortableItem
          key={`${item.id}-${task.title}`}
          index={index}
          data={{ task, taskId: task.id, categoryId: item.id }}
        />
      ))}
    </ul>
  );
});

export default SortableList;
