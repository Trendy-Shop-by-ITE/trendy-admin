import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { confirmCustomerOrder, getOrderList } from '../../redux/slice/orderSlice';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import OrderDetail from './OrderDetail';
import LoadingAnimation from '../../utils/LoadingAnimation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


// Base64 encoded Khmer font (example, shortened)
const khmerFont = `data:font/truetype;charset=utf-8;base64,AAEAAAARAQAABAAw...`;

const Order = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [detailVisit, setDetailVisit] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const data = useSelector((state) => state?.root?.order?.data?.data)

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const hadleConfirm = async (dataSend, params) => {
        console.log('Ok button clicked');
        console.log(dataSend)
        // Ensure onOk is being called
        setIsLoading(true);

        let response = {};

        try {
            const response = await dispatch(confirmCustomerOrder(dataSend.orderId, params))

            if (response?.status === 201) {
                initData()
                console.log(response)

                // Generate PDF
                const doc = generatePDF(dataSend.detail);

                // Convert PDF to data URI
                const pdfDataUri = doc.output('datauristring');

                // Convert PDF to Blob
                const pdfBlob = new Blob([doc.output()], { type: 'application/pdf' });

                // Create Blob URL
                const pdfBlobUrl = URL.createObjectURL(pdfBlob);

                // Open PDF in a new tab for preview
                window.open(pdfBlobUrl, '_blank');

                // Open PDF in a new tab for preview
                // window.open(pdfDataUri, '_blank');

            } else {
                // Handle the case where the creation was not successful
                console.log("Product creation failed");
            }

        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(true);
            //generat pdf here by use dataSend.detail

            setDetailVisit(false)
        }

        return response;

    }

    const generatePDF = (details) => {
        const doc = new jsPDF();
        let yPos = 20;


        // Add custom Khmer font
        doc.addFileToVFS('KhmerOS.ttf', khmerFont);
        doc.addFont('KhmerOS.ttf', 'KhmerOS', 'normal');
        doc.setFont('KhmerOS');

        doc.text('Order Details:', 10, yPos);
        yPos += 10;

        // User Details
        doc.text(`User ID: ${details.user.user_id}`, 10, yPos);
        yPos += 10;
        doc.text(`Username: ${details.user.username}`, 10, yPos);
        yPos += 10;
        doc.text(`Phone: ${details.user.phone}`, 10, yPos);
        yPos += 10;
        // Add more user details as needed

        // Address Details
        doc.text(`Address Name: ${details.address.address_name}`, 10, yPos);
        yPos += 10;
        doc.text(`Address: ${details.address.address_line}`, 10, yPos);
        yPos += 10;
        doc.text(`Recipient Name: ${details.address.recipient_name}`, 10, yPos);
        yPos += 10;
        doc.text(`Recipient Phone: ${details.address.recipient_phone}`, 10, yPos);
        yPos += 10;
        doc.text(`Delivery: ${details.delivery}`, 10, yPos);
        yPos += 10;
        // Add more address details as needed

        // Order Summary
        doc.text(`Order Date: ${new Date(details.onDate).toLocaleString()}`, 10, yPos);
        yPos += 10;
        doc.text(`Total Amount: $${details.totalAmount.toFixed(2)}`, 10, yPos);
        yPos += 10;
        doc.text(`Total Amount After Discount: $${details.totalAmountAfterDiscount.toFixed(2)}`, 10, yPos);
        yPos += 10;

        // Order Items
        details.items.forEach((item, index) => {
            yPos += 5; // Add some space between items
            doc.text(`Item ${index + 1}: ${item.product_name}`, 10, yPos);
            yPos += 10;
            doc.text(`Quantity: ${item.item_quantity}`, 15, yPos);
            doc.text(`Size: ${item.size}`, 50, yPos);
            doc.text(`Color: ${item.color}`, 80, yPos);
            // doc.text(`Amount: $${item.amount.toFixed(2)}`, 120, yPos);
            yPos += 10;
            // Add more item details as needed
        });

        return doc;
    };



    console.log(data)
    const dispatch = useDispatch();

    const initData = async () => {
        setIsLoading(true)
        let response = {}
        try {
            response = await dispatch(getOrderList())
        } catch (e) {
            console.log(e)
            response = e
        }
        setIsLoading(false)
        return response
    }


    const handleCancel = (id, isVisible) => async () => {
        // setSelectedProductId(id);
        setOpen(isVisible);
        console.log("product id = ", id);
        console.log('After setting deleteModalVisible:', isVisible);
    };


    const handleRowClick = (id) => {
        console.log(`Row clicked with ID: ${id}`);
        setDetailVisit(true)
        setOrderId(id)
        // Add your logic here
    };

    const handleRowHover = (id) => {
        console.log(`Row hovered with ID: ${id}`);
        // Add your logic here
    };




    useEffect(() => {
        initData()
    }, [])

    return (
        <>
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
            <div className="bg pt-4 bg-white p-1 rounded-lg px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A table of placeholder stock market data that does not make any sense.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        {/* <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Export
              </button> */}
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            Order ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Username
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Amont
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Net amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Status
                                        </th>
                                        {/* <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Net amount
                      </th> */}
                                        <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data?.map((item, index) => (
                                        <tr key={index}
                                            onClick={() => handleRowClick(item.order_id)}
                                            onMouseEnter={() => handleRowHover(item.order_id)}
                                            className="cursor-pointer hover:bg-gray-100">
                                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{item.order_id}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                {item.user_name}
                                            </td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{item.user_phone}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${item.total_amount}</td>
                                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${item.total_amount_after_discount}</td>
                                            <td className={`whitespace-nowrap px-2 py-2 text-sm text-gray-500 ${item.status === 'cancelled' ? 'text-red-500' : (item.status === 'pending') ? 'text-yellow-600' : 'text-green-600'}`}>{item.status}</td>
                                            {/* <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.netAmount}</td> */}
                                            <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    type="button"
                                                    className="relative -ml-px inline-flex items-center rounded-r-md bg-red-400 px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:bg-red-500 focus:z-10"
                                                    onClick={handleCancel(item.id, true)}
                                                >
                                                    {/* <MdOutlineDeleteForever className="h-5 w-5 me-2" aria-hidden="true" /> */}
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Payment successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                                                    pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                            onClick={() => setOpen(false)}
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {detailVisit && (
                <OrderDetail
                    isVisible={detailVisit}
                    onOk={hadleConfirm}
                    onCancel={() => setDetailVisit(false)}
                    orderId={orderId}
                />
            )}


        </>
    )
}

export default Order;
