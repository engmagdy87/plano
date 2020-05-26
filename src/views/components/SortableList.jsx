import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ item }) => {
  if (item.tasks === null) return <div />;
  return (
    <ul>
      {item.tasks.map((task, index) => (
        <SortableItem
          key={task.id}
          index={index}
          data={{ task, taskId: task.id, categoryId: item.id }}
        />
      ))}
    </ul>
  );
});

export default SortableList;
