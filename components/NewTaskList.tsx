import React, { useState, useRef } from 'react'
import { useOnClickOutside } from '../utils/hooks'
import ListBox from './ListBox'
import ApiKit from '../utils/ApiKit'
import { usetodoContext } from '../utils/TodoContext'

interface NewTaskListProps {}

const NewTaskList: React.FC<NewTaskListProps> = () => {
    const { setTodolists, todolists } = usetodoContext()

    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [tasks, setTasks] = useState<{ title: string; completed: boolean }[]>(
        []
    )
    const containerRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(containerRef, (event) => {
        if (showDetail) {
            if (title !== '' || tasks.length > 0) {
                ApiKit.createList(
                    {
                        title,
                        tasks,
                    },
                    (data) => {
                        setTodolists([...todolists, data])
                        setTitle('')
                        setTasks([])
                    }
                )
                return
            }
            setShowDetail(false)
            return
        }
        console.log('Have not entered')
        return
    })
    return (
        <div ref={containerRef} className="shadow-md p-3 max-w-xl">
            <input
                onFocus={(e) => {
                    setShowDetail(true)
                }}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                value={title}
                type="text"
                placeholder="Make a list"
                className="w-full"
            />
            <div
                className={`box-border ${
                    showDetail
                        ? 'visible opacity-100 h-auto px-3 pb-3 pt-5 '
                        : 'invisible opacity-0 h-0 p-0'
                }`}
            >
                <ListBox
                    items={tasks}
                    addItem={(task, onCompete) => {
                        setTasks((state) => {
                            onCompete()
                            return [...state, task]
                        })
                    }}
                    updateList={(index, task) => {
                        setTasks((state) => {
                            const newList = [...state]
                            newList[index] = task
                            return newList
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default NewTaskList
