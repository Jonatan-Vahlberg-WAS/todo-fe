import React from 'react'
import { Field } from 'formik'

const StyledInput: React.FC<React.HTMLProps<HTMLInputElement>> = ({
    name,
    ...props
}) => {
    return (
        <div className={'w-full'}>
            <Field
                className="w-9/12 max-w-xs pr-3 pt-2 pb-1 .5 mb-3 bg-gray-200 bg-opacity-50 border-b-2 border-white"
                name={name}
                {...props}
            />
        </div>
    )
}

export default StyledInput
