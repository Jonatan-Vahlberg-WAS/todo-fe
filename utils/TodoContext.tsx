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
}>({
    todolists: [],
    setTodolists: undefined,
})

export const ContextWrapper: React.FC<{}> = ({ children }) => {
    const [todolists, setTodolists] = useState<TaskList[]>([])
    return (
        <TodoContext.Provider
            value={{
                todolists,
                setTodolists,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
export const usetodoContext = () => {
    return useContext(TodoContext)
}
