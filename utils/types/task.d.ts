type Task = {
    title: string
    completed: boolean
    id?: number
}

type TaskList = {
    title?: string
    updated_at?: string
    tasks: Task[]
    id?: number
}
