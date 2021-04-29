import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { newTaskSchema } from '../utils/schemas'
import TaskItem from './TaskItem'

type ListBoxProps = {
    items: Task[]
    addItem: (task: Task, onComplete: () => void) => void
    updateList: (index: number, task: Task) => void
    updateMode?: boolean
}

const ListBox: React.FC<ListBoxProps> = ({
    items,
    addItem,
    updateList,
    updateMode,
}) => {
    return (
        <div className={`flex flex-col flex-grow overflow-hidden`}>
            <Formik
                initialValues={{
                    newTask: '',
                }}
                validationSchema={newTaskSchema}
                onSubmit={(values, { resetForm }) => {
                    addItem(
                        {
                            title: values.newTask,
                            completed: false,
                        },
                        () => resetForm()
                    )
                }}
            >
                {({}) => (
                    <Form>
                        <div className="flex items-center">
                            <span className="text-gray-400 font-bold pr-3 w-6 box-border">
                                +
                            </span>
                            <Field
                                name="newTask"
                                className="w-full border-b-2 border-gray-200 outline-none"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
            <div
                className={`mt-4 flex-grow ${
                    updateMode ? 'overflow-y-auto' : ''
                }`}
            >
                {items.map((item, index) => (
                    <TaskItem
                        key={`ITEM_NEW_TASK_${index}`}
                        task={item}
                        updateTask={(updatedTask) => {
                            updateList(index, updatedTask)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListBox
