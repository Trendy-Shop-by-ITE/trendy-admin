import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmCustomerOrder, getOrderDetailData } from '../../redux/slice/orderSlice';
import { format, getDate, isValid, isToday, isYesterday } from 'date-fns';
import LoadingAnimation from '../../utils/LoadingAnimation';

const OrderDetail = ({ isVisible, onCancel, onOk, orderId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const data = useSelector((state) => state?.root?.order?.dataDetail)
  const dispatch = useDispatch();

  console.log(data)

  const initData = async (params) => {
    setIsLoading(true)
    let response = {}
    try {
      response = await dispatch(getOrderDetailData(orderId, params))
    } catch (e) {
      console.log(e)
      response = e
    }
    setIsLoading(false)
    return response
  }


  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   if (!isValid(date)) {
  //     return 'Invalid date';
  //   }
  //   const day = getDate(date);
  //   const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
  //   let formattedDate = format(date, `LLLL yyyy 'at' hh:mm a`);
  //   formattedDate = formattedDate.replace('March', 'Mart'); // Custom month name
  //   return `${dayWithSuffix} ${formattedDate}`;
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isValid(date)) {
      return 'Invalid date';
    }

    if (isToday(date)) {
      return `Today at ${format(date, 'hh:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'hh:mm a')}`;
    }

    const day = getDate(date);
    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    let formattedDate = format(date, `LLLL yyyy 'at' hh:mm a`);
    formattedDate = formattedDate.replace('March', 'Mart'); // Custom month name
    return `${dayWithSuffix} ${formattedDate}`;
  };


  const handleCancel = () => {
    onCancel();
  };



 const handleOk = () => {
    const dataSend = {
      "detail": data,
      "orderId": orderId
    }
    onOk(dataSend)
 }


  useEffect(() => {
    initData()
  }, [orderId])







  return (
    <Modal
      visible={isVisible}
      title="Order Details"
      onOk={handleOk}
      onCancel={handleCancel}
      width={'80%'}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            type="primary"
            onClick={handleOk}
            className=' bg-blue-600 hover:bg-blue-400'
          >
            Confirm
          </Button>
        </>
      )}
    >
      <div>
        {/* {isLoading && (
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
        )} */}
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col ">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #000{orderId}</h1>
            <p className="text-base font-medium leading-6 text-gray-600">{formatDate(data.onDate)}</p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

                {data?.items?.map((product, index) => (
                  <div key={index} className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                    <div className="w-full md:w-40">
                      <img className="w-full hidden md:block" src={product.images[0].image_url} alt={product.product_name} />
                      <img className="w-full md:hidden" src={product.image} alt={product.name} />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.product_name}</h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-500">Size: </span>{product.size}
                          </p>
                          <p className="text-sm leading-none text-gray-800" style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="text-gray-500">Color: </span>
                            <div style={{ backgroundColor: product.color_code, width: '20px', height: '20px', marginLeft: '4px', display: 'inline-block' }}></div>
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-500">Qty: </span>{product.item_quantity}
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-500">Discount: </span>{product.product_discount}%
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          ${product.product_price - (product.product_price * (product.product_discount / 100))} {product.product_discount !== 0 && <span className="text-red-300 line-through ml-3"> ${product.product_price}</span>}
                        </p>
                        {/* <p className="text-base xl:text-sm leading-6 text-gray-400"><span className="text-gray-400 text-sm">Qty: </span>{product.item_quantity}</p> */}
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${(product.product_price - (product.product_price * (product.product_discount / 100))) * product.item_quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
              <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between  w-full">
                      <p className="text-base leading-4 text-gray-800">Amount</p>
                      <p className="text-base leading-4 text-gray-600">${data.totalAmount}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Net Amount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">Total After Discount</span>
                      </p>
                      <p className="text-base leading-4 text-gray-600">{data.totalAmountAfterDiscount}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800">Shipping</p>
                      <p className="text-base leading-4 text-gray-600">$2.5</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                    <p className="text-base font-semibold leading-4 text-gray-600">${data.totalAmountAfterDiscount + 2.5}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div class="w-8 h-8">
                        <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 font-semibold text-gray-800">
                          J&T Delivery
                          <br />
                          <span className="font-normal">Delivery with 24 Hours</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 text-gray-800">$2.5</p>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    {/* <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex justify-center items-center">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4q9UCn04XFKuf8po35EaDjXScDnxRG5SBAN2fTZZ-&s" alt="J&T Delivery Logo" className="h-6 w-6 mr-2" />
                      J&T Delivery
                    </button> */}
                    <img src={`${data.delivery === 'grab' ? 'https://cdn.worldvectorlogo.com/logos/grab.svg': (data.delivery === 'food_panda')? 'https://cdn.worldvectorlogo.com/logos/foodpanda-logo.svg': (data.delivery === 'j&t')? 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/J%26T_Express_logo.svg/1296px-J%26T_Express_logo.svg.png': (data.delivery === 'wownow')? 'https://static.wixstatic.com/media/d098c7_6f3203137f484871b3337eb214689623~mv2.jpg/v1/fill/w_940,h_320,al_c,q_80/WowNow.jpg':'https://static.wixstatic.com/media/d098c7_3a8a757429ea44d8bbf657ccce8048ec~mv2.jpg/v1/fill/w_640,h_218,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Otres%20Resort.jpg'}`} alt="Delivery Logo" className="w-full mr-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
              <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                    <div className=" flex justify-start items-start flex-col space-y-2">
                      <p className="text-base font-semibold leading-4 text-left text-gray-800">{data?.user?.username}</p>
                      <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
                    </div>
                  </div>

                  <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.62 10.79C8.06 13.37 10.63 15.94 13.21 17.38L15.59 15C15.87 14.73 16.23 14.62 16.59 14.71C17.66 14.96 18.79 15.11 20 15.11C20.55 15.11 21 15.56 21 16.11V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.89C8.44 3 8.89 3.45 8.89 4C8.89 5.21 9.04 6.34 9.29 7.41C9.38 7.77 9.27 8.13 9 8.41L6.62 10.79Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 text-gray-800">{data?.user?.phone}</p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{data?.address?.address_line}</p>
                    </div>
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{data?.address?.address_line}</p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                    {/* <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  )
}

export default OrderDetail