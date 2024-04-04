import React, { useEffect, useState, useRef } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { getTopLevelCategory, createSubCategory, postImageCategory } from '../../redux/slice/categorySlice';
import { getSubCategoryLevel } from '../../redux/slice/subCategorySlice';
import { createProductMain } from '../../redux/slice/productSlice';
import LoadingAnimation from '../../utils/LoadingAnimation';
import { notification } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const AddCategory = () => {

  const typteData = useSelector((state) => state?.root?.category?.data);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const categoryData = useSelector((state) => state?.root?.subCategory?.data)
  const [selectedType, setSelectedType] = useState();
  const [categoryName, setCategoryName] = useState()
  const [category_id, setCategory_id] = useState()
  const fileImage = useRef(null)

  const [img, setImg] = useState()

  const openNotification = (description, isSuccess) => {
    notification.open({
      message: 'Category Created',
      description: description,
      icon: isSuccess ? <CheckCircleOutlined className=' text-green-500' /> : <CloseCircleOutlined className=' text-red-500' />
    });
  };

  const handleTypeChange = (event) => {
    const selectedTypeId = event.target.value;
    setSelectedType(selectedTypeId);
    console.log('tyid = ', selectedTypeId)
  };

  const handleInputChangeImgaeFile = (field, e) => {
    const file = e.target.files[0];
    setImg(file)
  }



  const handleCreateCategory = async (e) => {
    setIsLoading(true);
    const params = {
      "name": categoryName,
      "parent_id": selectedType,
    };

    let response = {};

    try {
      const createCategoryResponse = await dispatch(createSubCategory(params));

      if (createCategoryResponse?.status === 201) {
        const { categoryId } = createCategoryResponse.data;
        setCategory_id(categoryId);

        const formData = new FormData();
        formData.append('category_id', categoryId);
        formData.append('image', img);

        try {
          const postImageResponse = await dispatch(postImageCategory(formData));

          if (postImageResponse?.status === 201) {
            setCategoryName('');
            openNotification(postImageResponse?.data?.message, true);
          } else {
            // Handle the case where posting the image was not successful
            openNotification(postImageResponse?.data?.message, false);
            console.log("Image category creation failed");
          }
        } catch (imageError) {
          console.log(imageError);
        }
      } else {
        // Handle the case where the category creation was not successful
        openNotification(createCategoryResponse?.data?.message, false);
        console.log("Category creation failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



  const initData = async () => {
    setIsLoading(true);
    let response = {};
    try {
      response = await dispatch(getTopLevelCategory());
      const tyId = response[0].id
      console.log('type = ', tyId)
      setSelectedType(tyId)
    } catch (e) {
      console.log(e);
      response = e;
    }
    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    initData()
  }, [])






  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <LoadingAnimation />

        </div>
      )}
      <h2 className='mb-4 text-3xl font-bold'>Add Category</h2>
      <div className='bg bg- bg-white p-1 rounded-lg'>
        <div className=' mt-5 ms-5'>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Category Information</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Please fill the form for create category.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="category-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Category name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="categoryt-name"
                  id="category-name"
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Type
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="type"
                  name="type"
                  autoComplete="gender"
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {typteData?.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}

                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor={`file`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Image File
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="file_input"
                  type="file"
                  accept='.png, .jpg'
                  ref={fileImage}
                  onChange={(e) => handleInputChangeImgaeFile('imageFile', e)}
                  className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
                {/* <input
                      type="number"
                      id={`amount-${index}`}
                      name={`amount-${index}`}
                      value={item.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value, index)}
                      className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    /> */}
              </div>
            </div>

          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleCreateCategory}
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>


      </div>
    </div>
  )
}

export default AddCategory