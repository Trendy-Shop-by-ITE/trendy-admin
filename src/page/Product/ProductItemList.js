import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Pagination, Select, Dropdown, Menu } from 'antd';
import { getAllProductItem, deleteProductItemById, updateProductItemById } from '../../redux/slice/productSlice';

import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md"
import ConfirmDelete from '../../utils/ConfirmDelete';
import ConfirmUpdateProductItem from '../../utils/ConfirmUpdateProductItem';
import { notification } from 'antd';
import { MdOutlineFilterAlt } from "react-icons/md";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import LoadingAnimation from '../../utils/LoadingAnimation';


const { Option } = Select;

const ProductItemList = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const productItems = useSelector((state) => state?.root.product?.productItem?.data);
    const [productItemData, setProductItemData] = useState()
    const [isVisible, setIsVisible] = useState(null);
    const [isUpdateVisible, setIsUpdateVisible] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductIdUpdate, setSelectedProductIdUpdate] = useState(null);
    const [filterType, setFilterType] = useState("1")


    const handleFilterChange = ({ key }) => {
        // Handle the filter type change here
        console.log('Selected Filter Type:', key);
        // Call the fetchProductItems function with the selected filter type
        setFilterType(key)
        if (key === '1') {
            initData()
        }
        if (key === '2') {
            initData({ sortBy: 'amount', sortOrder: 'asc' })
        }
        if (key === '3') {
            initData({ sortBy: 'amount', sortOrder: 'desc' })
        }
        if (key === '4') {
            initData({ sortBy: 'pending', sortOrder: 'asc' })
        }
        if (key === '5') {
            initData({ sortBy: 'pending', sortOrder: 'desc' })
        }

    };

    const filterMenu = (
        <Menu onClick={handleFilterChange}>
            <Menu.Item key="1" icon={<MdOutlineFilterAlt />}>
                Simple List
            </Menu.Item>
            <Menu.Item key="2" icon={<MdOutlineFilterAlt />}>
                By low amount
            </Menu.Item>
            <Menu.Item key="3" icon={<MdOutlineFilterAlt />}>
                By highest amount
            </Menu.Item>
            <Menu.Item key="4" icon={<MdOutlineFilterAlt />}>
                By low pending
            </Menu.Item>
            <Menu.Item key="5" icon={<MdOutlineFilterAlt />}>
                By highest pending
            </Menu.Item>
        </Menu>
    );

    const openNotification = (description, isSuccess) => {
        notification.open({
            message: 'Product Deleted',
            description: description,
            icon: isSuccess ? <CheckCircleOutlined className=' text-green-500' /> : <CloseCircleOutlined className=' text-red-500' />
        });
    };
    const openNotificationUpdate = (description, isSuccess) => {
        notification.open({
            message: 'Product Updated',
            description: description,
            icon: isSuccess ? <CheckCircleOutlined className=' text-green-500' /> : <CloseCircleOutlined className=' text-red-500' />
        });
    };
    const confirmDelete = async () => {
        setIsLoading(true);
        let response = {}
        try {
            response = await dispatch(deleteProductItemById(selectedProductId))

            if (response) {
                console.log('delete res = ', response)
                if (response?.status == 200) {
                    openNotification(response?.data?.message, true)
                }
                if (response?.status == 500) {
                    openNotification(response?.data?.error, false)
                }

                initData()
            }
            // await dispatch(deleteProductById(selectedProductId));
            // initData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsVisible(false);
            setSelectedProductId(null);
            setIsLoading(false);
        }
    };

    const confirmUpdate = async (updateData) => {
        setIsLoading(true);
        let response = {}
        try {
            response = await dispatch(updateProductItemById(selectedProductIdUpdate, updateData))

            if (response) {
                console.log('delete res = ', response)
                if (response?.status == 200) {
                    openNotificationUpdate(response?.data?.message, true)
                }
                if (response?.status == 500) {
                    openNotificationUpdate(response?.data?.error, false)
                }
                if (response?.status == 404) {
                    openNotificationUpdate(response?.data?.error, false)
                }

                if (filterType === '1') {
                    initData()
                }
                if (filterType === '2') {
                    initData({ sortBy: 'amount', sortOrder: 'asc' })
                }
                if (filterType === '3') {
                    initData({ sortBy: 'amount', sortOrder: 'desc' })
                }
                if (filterType === '4') {
                    initData({ sortBy: 'pending', sortOrder: 'asc' })
                }
                if (filterType === '5') {
                    initData({ sortBy: 'pending', sortOrder: 'desc' })
                }
            }
            // await dispatch(deleteProductById(selectedProductId));
            // initData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdateVisible(false);
            setSelectedProductIdUpdate(null);
            setIsLoading(false);
        }

    }
    const handleDelete = (id, isVisible) => async () => {
        setSelectedProductId(id);
        setIsVisible(isVisible);
        console.log("product id = ", id);
        console.log('After setting deleteModalVisible:', isVisible);
    };

    const handleUpdate = (id, isVisible) => async () => {
        setSelectedProductIdUpdate(id);
        setIsUpdateVisible(isVisible);
        console.log("product id = ", id);
        console.log('After setting updateModalVisible:', isVisible);
    };
    const initData = async (params) => {
        setIsLoading(true);
        let response = {};
        try {
            response = await dispatch(getAllProductItem(params));
        } catch (e) {
            console.log(e);
            response = e;
        }
        setIsLoading(false);
        return response;
    };



    useEffect(() => {
        // Fetch product items when the component mounts
        // initData({ size: '', page: 2, limit: 2 }); // Pass your desired parameters here
        initData({ sortBy: 'amount', sortOrder: 'desc' })



    }, [dispatch]);

    return (
        <di>
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
            <h2 className='mb-4 text-3xl font-bold'>Product Item List</h2>
            <div className='bg-main bg-white p-1 rounded-lg'>
                <div className="px-4 sm:px-6 lg:px-8 h-screen">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                        </div>
                        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Product
                            </button>
                        </div> */}
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Nº
                                            </th>
                                            <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Product
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Size
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Color
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Pending
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
                                        {productItems?.map((item, index) => (
                                            <tr key={index}>
                                                <td
                                                    className="whitespace-nowrap px-3 py-5 text-sm"
                                                >
                                                    <div className="font-medium text-gray-900">{index + 1}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-2 pl-4  text-sm sm:pl-0">

                                                    {/* <div className="h-20 w-20 flex-shrink-0">
                                                    <img className="h-20 w-20 " src={item.image[0]?.image_url} alt="image" />
                                                </div> */}
                                                    <div>
                                                        <div className="font-medium text-left text-gray-900">{item.product_name}</div>
                                                        {/* <div className="mt-1 text-gray-500">{person.email}</div> */}
                                                    </div>

                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className={`text-gray-900 ${item.amount < 3 ? 'text-red-500' : (item.amount >= 3 && item.amount < 6) ? 'text-yellow-600' : 'text-green-600'}`}>{item.amount}</div>
                                                    {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className={`inline-flex items-center rounded-md ${item.amount < 3 ? ' bg-red-100' : (item.amount >= 3 && item.amount < 6) ? 'bg-yellow-100' : 'bg-green-100'} px-2 py-1 text-xs font-medium ${item.amount < 3 ? 'text-red-700' : (item.amount >= 3 && item.amount < 6) ? 'text-yellow-700' : 'text-green-700'}  ring-1 ring-inset ${item.amount < 3 ? 'ring-red-700/40' : (item.amount >= 3 && item.amount < 6) ? 'ring-yellow-700/40' : 'ring-green-700/40'}  me-1`}>
                                                        {item.size}</div>
                                                    {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap px-3 py-5 text-sm">
                                                    <div style={{ backgroundColor: item.color_code, width: '20px', height: '20px' }}> </div>
                                                </td>
                                                <td className={`whitespace-nowrap px-3 py-5 text-sm ${item.pending < 4 ? 'text-red-500' : (item.pending >= 4 && item.pending < 7) ? 'text-orange-500' : 'text-yellow-500'}`}>
                                                    {item.pending}
                                                </td>
                                                <td className=" py-5 text-center text-sm sm:pr-0">
                                                    <span className="isolate inline-flex rounded-md shadow-sm">
                                                        <button
                                                            type="button"
                                                            onClick={handleUpdate(item.id, true)}
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
                </div>
            </div>
            {selectedProductId && (
                <ConfirmDelete
                    isVisible={isVisible}
                    onOk={confirmDelete}
                    onCancel={() => setIsVisible(false)}
                />
            )}
            {selectedProductIdUpdate && (
                <ConfirmUpdateProductItem
                    isVisible={isUpdateVisible}
                    onOk={confirmUpdate}
                    onCancel={() => setIsUpdateVisible(false)}
                    id={selectedProductIdUpdate}
                />
            )}
        </di>
    );
};

export default ProductItemList;
