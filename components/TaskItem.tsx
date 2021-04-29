import React from 'react'

interface TaskItemProps {
    task: Task
    updateTask: (updatedTask: Task) => void
    listMode?: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateTask, listMode }) => {
    const onChange = (name: 'title' | 'completed', value: any) => {
        let updatedTask: Task = { ...task }
        if (name === 'title') {
            updatedTask[name] = value as string
        }
        if (name === 'completed') {
            updatedTask[name] = value as boolean
        }
        updateTask(updatedTask)
    }
    return (
        <div
            className={`w-full ${
                listMode ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
        >
            <label className="inline-flex items-center w-full">
                <input
                    checked={task.completed}
                    onChange={(e) => {
                        onChange('completed', e.target.checked)
                    }}
                    type="checkbox"
                    className="form-checkbox text-yellow-400 bg-gray-200"
                />
                <input
                    value={task.title}
                    onChange={(e) => {
                        onChange('title', e.target.value)
                    }}
                    type="text"
                    className="ml-2 w-full"
                />
            </label>
        </div>
    )
}

export default TaskItem
