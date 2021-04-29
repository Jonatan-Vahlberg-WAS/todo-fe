import {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
} from 'react'

const TodoContext = createContext<{
    todolists: TaskList[]
    setTodolists: Dispatch<SetStateAction<TaskList[]>>
    selectedTodolist?: TaskList
    setSelectedTodolist: Dispatch<SetStateAction<TaskList>>
}>({
    todolists: [],
    setTodolists: undefined,
    selectedTodolist: undefined,
    setSelectedTodolist: undefined,
})

export const ContextWrapper: React.FC<{}> = ({ children }) => {
    const [todolists, setTodolists] = useState<TaskList[]>([])
    const [selectedTodolist, setSelectedTodolist] = useState<TaskList>()
    return (
        <TodoContext.Provider
            value={{
                todolists,
                setTodolists,
                selectedTodolist,
                setSelectedTodolist,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
export const usetodoContext = () => {
    return useContext(TodoContext)
}
