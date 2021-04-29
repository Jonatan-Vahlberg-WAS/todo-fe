import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { usetodoContext } from '../utils/TodoContext'
import ListBox from './ListBox'
import moment from 'moment'
import ApiKit from '../utils/ApiKit'
import { FaTrashAlt } from 'react-icons/fa'
interface UpdateListModalProps {
    isOpen: boolean
    toggle: VoidFunction
}

Modal.setAppElement('#__next')
const UpdateListModal: React.FC<UpdateListModalProps> = ({
    isOpen,
    toggle,
}) => {
    const { selectedTodolist, setTodolists } = usetodoContext()
    const [title, setTitle] = useState<string>(selectedTodolist?.title ?? '')
    const [tasks, setTasks] = useState<Task[]>(selectedTodolist?.tasks ?? [])
    useEffect(() => {
        if (selectedTodolist) {
            setTitle(selectedTodolist.title)
            setTasks(selectedTodolist.tasks)
        }
    }, [selectedTodolist])
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                if (selectedTodolist) {
                    ApiKit.updateList(
                        { ...selectedTodolist, title, tasks },
                        (data) => {
                            console.log(data)
                            setTodolists((state) => {
                                let newTodoLists = state
                                let index = newTodoLists.findIndex(
                                    (list) => list.id === data.id
                                )
                                if (index) {
                                    newTodoLists[index] = data
                                }
                                return newTodoLists
                            })
                            toggle()
                        }
                    )
                }
            }}
            centered
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            className="bg-white p-5 py-8 absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2  h-4/6 w-8/12"
        >
            <button
                onClick={() => {
                    ApiKit.deleteList(selectedTodolist?.id, () => {
                        setTodolists((state) => {
                            let newTodoLists = state
                            newTodoLists = newTodoLists.filter(
                                (list) => list.id !== selectedTodolist.id
                            )
                            return newTodoLists
                        })
                        toggle()
                    })
                }}
                className="m-0 p-2 bg-transparent absolute top-0 right-0 text-red-500"
            >
                <FaTrashAlt />
            </button>
            <div className="h-full flex flex-col">
                <input
                    placeholder="Title of list"
                    type="text"
                    className="w-full mb-3"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <div className="flex flex-col flex-grow overflow-hidden">
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
                        updateMode
                    />
                </div>
                <p className="m-0 p-2 absolute bottom-0 right-0 text-xs text-gray-500">
                    {moment(selectedTodolist?.updated_at).format(
                        'YYYY-MM-DD HH:mm'
                    )}
                </p>
            </div>
        </Modal>
    )
}

export default UpdateListModal
