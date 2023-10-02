export default function EditForm ({ todo, edit, update }) {
  const { id, task } = todo
  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const task = formData.get(id)
    update(task, id)
  }

  return (
    <form className='flex gap-3 w-full my-1' onSubmit={onSubmit}>
      <input
        className='bg-gray-50 border border-gray-2 text-gray-1 text-sm rounded-xl focus:ring-blue-1 focus:border-blue-1 placeholder:text-gray-3 outline-none block w-full px-2'
        type='text'
        id={id}
        name={id}
        placeholder='add details'
        defaultValue={task}
      />
      <button
        className='bg-red-500 px-6 py-3 rounded-xl text-white font-semibold'
        type='button'
        onClick={() => edit(id)}
      >x
      </button>
      <button
        className='bg-blue-1 px-6 py-3 rounded-xl text-white font-semibold'
        type='submit'
      >Add
      </button>
    </form>
  )
}
