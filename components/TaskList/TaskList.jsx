import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                // pass the parent employee object as `employee` so child can update correct employee
                if (elem.active) {
                    return <AcceptTask key={idx} data={elem} employee={data} />
                }
                if (elem.newTask) {
                    return <AcceptTask key={idx} data={elem} employee={data} />
                }
                if (elem.completed) {
                    return <CompleteTask key={idx} data={elem} employee={data} />
                }
                if (elem.failed) {
                    return <FailedTask key={idx} data={elem} employee={data} />
                }
                return null
            })}
        </div>
    )
}

export default TaskList
