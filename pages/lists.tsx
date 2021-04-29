import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import NewTaskList from '../components/NewTaskList'
import ApiKit from '../utils/ApiKit'
import { usetodoContext } from '../utils/TodoContext'
import ListItem from '../components/ListItem'
import UpdateListModal from '../components/UpdateListModal'

interface listsProps {}

const lists: React.FC<listsProps> = () => {
    const {
        todolists,
        setTodolists,
        selectedTodolist,
        setSelectedTodolist,
    } = usetodoContext()
    useEffect(() => {
        ApiKit.getLists((data) => {
            setTodolists(data)
        })
    }, [])
    console.log('SELECt', selectedTodolist)
    return (
        <Layout>
            <NewTaskList />
            <div className="grid grid-cols-3 gap-2 mt-6">
                {todolists.map((list) => (
                    <ListItem list={list} />
                ))}
            </div>
            <UpdateListModal
                isOpen={!!selectedTodolist}
                toggle={() => {
                    setSelectedTodolist(undefined)
                }}
            />
        </Layout>
    )
}

export default lists
