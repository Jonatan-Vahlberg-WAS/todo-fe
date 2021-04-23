import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import NewTaskList from '../components/NewTaskList'
import ApiKit from '../utils/ApiKit'
import { usetodoContext } from '../utils/TodoContext'
import ListItem from '../components/ListItem'

interface listsProps {}

const lists: React.FC<listsProps> = () => {
    const { todolists, setTodolists } = usetodoContext()
    useEffect(() => {
        ApiKit.getLists((data) => {
            setTodolists(data)
        })
    }, [])
    return (
        <Layout>
            <NewTaskList />
            <div className="grid grid-cols-3 gap-2 mt-6">
                {todolists.map((list) => (
                    <ListItem list={list} />
                ))}
            </div>
        </Layout>
    )
}

export default lists
