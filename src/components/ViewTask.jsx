import { EditIcon, TrashIcon } from './Icons'

export function ViewTask ({ todo, toggle, edit, deteleTask }) {
  const { id, completed, task } = todo
  return (
    <div className='flex items-center justify-between py-3 cursor-pointer'>
      <div className='flex items-center'>
        <input id={id} type='checkbox' value={task} defaultChecked={completed} className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-1 cursor-pointer' onClick={() => toggle(id)} />
        <label htmlFor={id} className={`ml-2 font-medium text-gray-1 text-lg cursor-pointer ${completed ? 'line-through' : ''}`}>{task}</label>
      </div>
      <div className='flex gap-4'>
        {
          !completed && (
            <button className='hover:text-blue-1' onClick={() => edit(id)}>
              <EditIcon />
            </button>
          )
        }
        <button className='hover:text-red-500' onClick={() => deteleTask(id)}>
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}
