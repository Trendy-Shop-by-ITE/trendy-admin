import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductLevel } from '../../redux/slice/productSlice'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md"

const ProductList = () => {

    const [isLoading, setIsLoading] = useState(false)
    const data = useSelector((state) => state?.product?.data)
    const dispatch = useDispatch();
    const initData = async () => {
        setIsLoading(true)
        let response = {}
        try {
            response = await dispatch(getProductLevel())
        } catch (e) {
            console.log(e)
            response = e
        }
        setIsLoading(false)
        return response
    }
    useEffect(() => {
        initData()
    }, [])

    const handleDelete = (id) => {
        
    }
    console.log(data)
    return (
        <di>
            <h2 className='mb-4 text-3xl font-bold'>Product List</h2>
            <div className='bg bg- bg-white p-1 rounded-lg'>
                <div className="px-4 sm:px-6 lg:px-8 h-screen">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
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
                                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div className="flex items-center">
                                                        <div className="h-20 w-20 flex-shrink-0">
                                                            <img className="h-20 w-20 " src={item.image[0]?.image_url} alt="image" />
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
        </di>
    )
}

export default ProductList