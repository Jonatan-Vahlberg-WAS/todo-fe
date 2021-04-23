import React from 'react'
import TaskItem from './TaskItem'

interface ListItemProps {
    list: TaskList
}

const ListItem: React.FC<ListItemProps> = ({ list }) => {
    return (
        <div className="w-64 shadow-md p-3">
            <p>{list.title}</p>
            {list.tasks.map((item, index) => (
                <TaskItem
                    key={`ITEM_LIST_${list.title}_TASK_${index}`}
                    task={item}
                    updateTask={(updatedTask) => {}}
                />
            ))}
        </div>
    )
}

export default ListItem
