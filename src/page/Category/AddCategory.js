import React from 'react'
import CustomInput from '../../components/CustomInput'

const AddCategory = () => {
  return (
    <div>
      <h3 className='mb-4'>Add Category</h3>
      <div>
        <form action=''>
          <CustomInput type = "text" label = "Enter Category Name" />
          <button className='btn bg-green-600 text-white' type='submit'>
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory