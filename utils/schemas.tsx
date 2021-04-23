import * as yup from 'yup'
export const newTaskSchema = yup.object().shape({
    newTask: yup.string().required('A Title is required'),
})
