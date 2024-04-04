import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductById, getProductLevel } from '../../redux/slice/productSlice'
import { Space, Table, Pagination, Select, Dropdown, Menu, message } from 'antd';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md"
import ConfirmDelete from '../../utils/ConfirmDelete';
import { notification } from 'antd';
import { MdOutlineFilterAlt } from "react-icons/md";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import LoadingAnimation from '../../utils/LoadingAnimation';
import { Input } from 'antd';
import AddProduct from './AddProduct';
import AddProductItem from './AddProductItem';
const { Search } = Input;


const ProductList = () => {
    const openNotification = (description, isSuccess) => {
        notification.open({
            message: 'Product Deleted',
            description: description,
            icon: isSuccess ? <CheckCircleOutlined className=' text-green-500' /> : <CloseCircleOutlined className=' text-red-500' />
        });
    };
    const openNotificationCreate = (message, description, isSuccess) => {
        notification.open({
            message: message,
            description: description,
            icon: isSuccess ? <CheckCircleOutlined className=' text-green-500' /> : <CloseCircleOutlined className=' text-red-500' />
        });
    };

    const [isVisible, setIsVisible] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteData, setDeleteData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const data = useSelector((state) => state?.root?.product?.productData?.data)
    const [filterType, setFilterType] = useState("1")
    const [addVisit, setAddVisit] = useState(false)
    const [addItemVisit, setAddItemVisit] = useState(false)
    const [prodId, setProdId] = useState()
    const [prodName, setProdName] = useState('')
    const handleSearch = (value) => {
        // Update the searchQuery state when the user enters a search query
        setSearchQuery(value);
        console.log(value);
        // Call the fetchProductItems function with the search query
        // initData({ query: value });
    };

    const dataDelteRes = useSelector((state) => state?.root.product?.errorData)
    const dispatch = useDispatch();

    const handleOkDailog = async (dataSend) => {
        setAddVisit(false)
        console.log("data send = ",dataSend)
        const itemVisit = dataSend.addItemVisitble
        setAddItemVisit(itemVisit)
        setProdId(dataSend.productId)
        setProdName(dataSend.productName)
    }
    const handleItemOkDailog = async(meesages) => {
        setAddItemVisit(false)
        openNotificationCreate("Product Created", meesages.message, meesages.success)
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
            initData({ sortBy: 'product_price', sortOrder: 'asc' })
        }
        if (filterType === '5') {
            initData({ sortBy: 'product_price', sortOrder: 'desc' })
        }
        if (filterType === '6') {
            initData({ sortBy: 'product_discount', sortOrder: 'asc' })
        }
        if (filterType === '7') {
            initData({ sortBy: 'product_discount', sortOrder: 'desc' })
        }

    }

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
            initData({ sortBy: 'product_price', sortOrder: 'asc' })
        }
        if (key === '5') {
            initData({ sortBy: 'product_price', sortOrder: 'desc' })
        }
        if (key === '6') {
            initData({ sortBy: 'product_discount', sortOrder: 'asc' })
        }
        if (key === '7') {
            initData({ sortBy: 'product_discount', sortOrder: 'desc' })
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
                By low price
            </Menu.Item>
            <Menu.Item key="5" icon={<MdOutlineFilterAlt />}>
                By highest price
            </Menu.Item>
            <Menu.Item key="6" icon={<MdOutlineFilterAlt />}>
                By low discount
            </Menu.Item>
            <Menu.Item key="7" icon={<MdOutlineFilterAlt />}>
                By highest discount
            </Menu.Item>
        </Menu>
    );

    const initData = async (params) => {
        setIsLoading(true)
        let response = {}
        try {
            // Include the search query in the API call
            response = await dispatch(getProductLevel({ ...params, query: searchQuery }));
            console.log(response)

        } catch (e) {
            console.log(e)
            response = e
        }
        setIsLoading(false)
        return response
    }
    useEffect(() => {
        // initData({sortBy:'product_price', sortOrder: 'desc'})
        initData()
    }, [searchQuery])

    // if(dataDelteRes){
    //     console.log('data error = ',dataDelteRes)
    //     if(dataDelteRes.status == 500){
    //         openNotification(dataDelteRes.error, false)
    //     }
    //     if(dataDelteRes.status == 200){
    //         openNotification(dataDelteRes.error, true)
    //     }
    // }

    // const handleDelete = (id) => async () => {
    //     let response = {}
    //     try {
    //         response = await dispatch(deleteProductById(id))

    //         if (response) {
    //             initData()
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         response = error
    //     }
    // }
    const handleDelete = (id, isVisible) => async () => {
        setSelectedProductId(id);
        setIsVisible(isVisible);
        console.log("product id = ", id);
        console.log('After setting deleteModalVisible:', isVisible);
    };

    const confirmDelete = async () => {
        let response = {}
        try {
            response = await dispatch(deleteProductById(selectedProductId))

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
        }
    };

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
            <h2 className='mb-4 text-3xl font-bold'>Product List</h2>
            <div className='bg bg- bg-white p-1 rounded-lg'>
                <div className="px-4 sm:px-6 lg:px-8 h-full">
                    <div className="sm:flex items-center sm:items-center">
                        <div className="sm:flex-auto mt-4">
                            <Search
                                placeholder="Search products"
                                onSearch={handleSearch}
                                enterButton = 'Search'
                                allowClear
                                size='large'
                                style={{ width: 400 }}
                            />
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                onClick={()=> setAddVisit(true)}
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Product
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
                                                Product
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Available Size
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Price
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Discount (%)
                                            </th>
                                            <th scope="col" className="px-5 py-3.5 text-center text-2xl font-semibold text-gray-900">
                                                <Dropdown className=' text-center' overlay={filterMenu} trigger={['click']}>
                                                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                                        <MdOutlineFilterAlt />
                                                    </a>
                                                </Dropdown>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div className="flex items-center">
                                                        <div className="h-40 w-30 flex-shrink-0">
                                                            <img className="h-40 w-30 " src={item.image[0]?.image_url} alt="image" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-medium text-gray-900">{item.product_name}</div>
                                                            {/* <div className="mt-1 text-gray-500">{person.email}</div> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">{item.amount}</div>
                                                    {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    {item.available_size?.map((si) => (
                                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 me-1">
                                                            {si.size}
                                                        </span>
                                                    ))}

                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">$ {item.product_price}</td>
                                                <td className={`whitespace-nowrap px-3 py-5 text-sm ${item.product_discount === 0 ? 'text-red-500' : 'text-blue-500'}`}>
                                                    {item.product_discount} %
                                                </td>
                                                <td className=" py-5 text-center text-sm sm:pr-0">
                                                    <span className="isolate inline-flex rounded-md shadow-sm">
                                                        <button
                                                            type="button"
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

            {addVisit && (
                <AddProduct 
                isVisible={addVisit}
                onOk={handleOkDailog}
                onCancel={() => setAddVisit(false)}
                />
            )}
            {prodId && (
                <AddProductItem
                isVisible={addItemVisit}
                onOk={handleItemOkDailog}
                id={prodId}
                name={prodName}
                />
            )}
        </di>
    )
}

export default ProductList