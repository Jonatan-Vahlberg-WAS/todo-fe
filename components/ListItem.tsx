import React from 'react'
import TaskItem from './TaskItem'
import { usetodoContext } from '../utils/TodoContext'

interface ListItemProps {
    list: TaskList
}

const ListItem: React.FC<ListItemProps> = ({ list }) => {
    const { setSelectedTodolist } = usetodoContext()
    return (
        <button
            onClick={() => setSelectedTodolist(list)}
            className="flex flex-col text-left align-top w-64 cursor-pointer bg-white shadow-md  p-3 duration-200 hover:shadow-lg hover:filter hover:brightness-95 transform hover:-translate-y-1 focus:translate-y-0.5 focus:shadow-xl"
        >
            <p>{list.title}</p>
            {list.tasks.map((item, index) => (
                <TaskItem
                    key={`ITEM_LIST_${list.title}_TASK_${index}`}
                    task={item}
                    updateTask={(updatedTask) => {}}
                    listMode
                />
            ))}
        </button>
    )
}

export default ListItem
