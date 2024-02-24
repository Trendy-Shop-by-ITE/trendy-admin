import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubCategoryLevel, deleteCategory } from '../../../redux/slice/subCategorySlice'
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md"
import { Space, Table, Pagination, Select, Dropdown, Menu } from 'antd';
import { MdOutlineFilterAlt } from "react-icons/md";
import ConfirmDelete from '../../../utils/ConfirmDelete';
import { notification } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import LoadingAnimation from '../../../utils/LoadingAnimation';

const CategoryContent = (props) => {
  const id = props.id
  const name = props.name
  const [filterType, setFilterType] = useState("1")
  const [isVisible, setIsVisible] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const data = useSelector((state) => state?.root?.subCategory?.data)
  const dispatch = useDispatch();

  const openNotification = (description, isSuccess) => {
    notification.open({
      message: 'Category Created',
      description: description,
      icon: isSuccess ? <CheckCircleOutlined className=' text-green-500' /> : <CloseCircleOutlined className=' text-red-500' />
    });
  };

  

  const handleDelete = (id, isVisible) => async () => {
    setSelectedCategoryId(id);
    setIsVisible(isVisible);
    console.log("category id = ", id);
    console.log('After setting deleteModalVisible:', isVisible);
  };
  const handleFilterChange = ({ key }) => {
    // Handle the filter type change here
    console.log('Selected Filter Type:', key);
    // Call the fetchProductItems function with the selected filter type
    setFilterType(key)
    if (key === '1') {
      initData()
    }
    if (key === '2') {
      initData({ sortOrder: 'old' })
    }
    if (key === '3') {
      initData({ sortOrder: 'new' })
    }

  };


  const confirmDelete = async () => {
    setIsLoading(true);
    let response = {}
    try {
      response = await dispatch(deleteCategory(selectedCategoryId))

      if (response) {
        console.log('delete res = ', response)
        if (response?.status == 200) {
          openNotification(response?.data?.message, true)
        }
        if (response?.status == 500) {
          openNotification(response?.data?.error, false)
        }
        if (response?.status == 404) {
          openNotification(response?.data?.error, false)
        }

        if (filterType === '1') {
          initData()
        }
        if (filterType === '2') {
          initData({ sortOrder: 'old' })
        }
        if (filterType === '3') {
          initData({ sortOrder: 'new' })
        }
      }
      // await dispatch(deleteProductById(selectedProductId));
      // initData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsVisible(false);
      setSelectedCategoryId(null);
      setIsLoading(false);
    }

  }


  const filterMenu = (
    <Menu onClick={handleFilterChange}>
      <Menu.Item key="1" icon={<MdOutlineFilterAlt />}>
        Simple List
      </Menu.Item>
      <Menu.Item key="2" icon={<MdOutlineFilterAlt />}>
        By old
      </Menu.Item>
      <Menu.Item key="3" icon={<MdOutlineFilterAlt />}>
        By new
      </Menu.Item>
    </Menu>
  );

  

  console.log("data sub = ", data)

  const initData = async (params) => {
    setIsLoading(true)
    let response = {}
    try {
      response = await dispatch(getSubCategoryLevel(id, params))
      console.log("sub cate = ", response)
    } catch (error) {
      console.log(error)
      response = error
    }
    setIsLoading(false)
    return response
  }

  useEffect(() => {
    initData()
    console.log(data)
  }, [id])

  return (
    <div className="px-4 sm:px-6 lg:px-8 h-full">
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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Created At
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Updated At
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-center text-2xl items-center font-semibold text-gray-900">
                    <Dropdown className=' text-center' overlay={filterMenu} trigger={['click']}>
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <MdOutlineFilterAlt />
                      </a>
                    </Dropdown>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-40 w-30 flex-shrink-0">
                          <img className="h-40 w-30 " src={item.image_url} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          {/* <div className="mt-1 text-gray-500">{person.email}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{item.description}</div>
                      {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {item.created_at}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{item.updated_at}</td>
                    <td className=" py-5 text-center text-sm sm:pr-0">
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        <button
                          type="button"
                          // onClick={handleUpdate(item.id, true)}
                          className="relative inline-flex items-center rounded-l-md bg-cyan-400 px-2 py-2 text-white ring-1 ring-inset me-2 ring-gray-300 hover:bg-cyan-500 focus:z-10"
                        >
                          <FiEdit className="h-5 w-5 me-2" aria-hidden="true" />
                          Edit

                        </button>
                        <button
                          type="button"
                          className="relative -ml-px inline-flex items-center rounded-r-md bg-red-400 px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:bg-red-500 focus:z-10"
                          onClick={handleDelete(item.id, true)}
                        >
                          <MdOutlineDeleteForever className="h-5 w-5 me-2" aria-hidden="true" />
                          Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedCategoryId && (
        <ConfirmDelete
          isVisible={isVisible}
          onOk={confirmDelete}
          onCancel={() => setIsVisible(false)}
        />
      )}
    </div>
  )
}

export default CategoryContent