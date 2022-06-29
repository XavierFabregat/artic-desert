import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../redux/kanban/actions';
import './ListItem.css';

type Task = {
  creator: string;
  title: string;
  body: string;
  timestamp: string;
};

interface ItemProps {
  task: Task;
  index: number;
  column: string;
}

export const ListItem: React.FC<ItemProps> = ({ task, index, column }) => {
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={task.timestamp} index={index}>
      {provided => (
        <div
          className="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <button onClick={() => dispatch(deleteTask(task, column, index))}>
            X
          </button>
          <h3>{task.title}</h3>
          <div>{task.body}</div>
          <p>{task.creator}</p>
        </div>
      )}
    </Draggable>
  );
};
