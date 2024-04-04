import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { getProductItemByIddd, getProductLevel } from '../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmUpdateProductItem = ({ isVisible, onOk, onCancel, id }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [productItem, setProductItem] = useState({
    product_id: '',
    product_name: '',
    size: '',
    amount: '',
    color: '',
    color_code: '',
    id
    // Add other fields here
  });

  const data = useSelector((state) => state?.root.product?.data)
  console.log(data)

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

  const fetchProductItemData = async (id) => {
    setIsLoading(true);
    try {
      const response = await dispatch(getProductItemByIddd(id));
      setProductItem(response.data); // Assuming that the API response has the data structure you expect
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initData()
    if (isVisible && id) {
      fetchProductItemData(id);
    }
  }, [isVisible, id]);

  const handleOk = () => {
    console.log('Ok button clicked');
    onOk(productItem); // Ensure onOk is being called
  };
  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (field, value) => {
    setProductItem((prevProductItem) => ({
      ...prevProductItem,
      [field]: value,
    }));
  };

  return (
    <Modal
      visible={isVisible}
      title="Update Product Item"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            type="primary"
            onClick={handleOk}
            className=' bg-blue-600 hover:bg-blue-400'
          >
            Update
          </Button>
        </>
      )}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <label htmlFor={`product-name}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Product Name {productItem.product_id}
            </label>
            <div className="mt-2 sm:mt-0">
              <select
                id={`product-name}`}
                name={`product-name}`}
                autoComplete= {productItem.product_name}
                value={productItem.product_name}
                onChange={(e) => {
                  handleInputChange('product_name', e.target.value)
                  handleInputChange('product_id', e.target.value)
                }}
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                 {data?.map((item) => (
                    <option key={item.id} value={item.id}>{item.product_name}</option>
                  ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={`size}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Size
            </label>
            <div className="mt-2 sm:mt-0">
              <select
                id={`size}`}
                name={`size}`}
                autoComplete={`size}`}
                value={productItem.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="XS">XS</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={`amount}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Amount
            </label>
            <div className="mt-2 sm:mt-0">
              <input
                type="number"
                id={`amount}`}
                name={`amount}`}
                value={productItem.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`color-code}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Color Code
            </label>
            <div className="mt-2 sm:mt-0">
              <input
                type="color"
                id={`color-code}`}
                name={`color-code}`}
                value={productItem.color_code}
                onChange={(e) => handleInputChange('color_code', e.target.value)}
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`color}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              Color
            </label>
            <div className="mt-2 sm:mt-0">
              <input
                type="text"
                id={`color}`}
                name={`color}`}
                value={productItem.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
      )}
    </Modal>
  );
};

export default ConfirmUpdateProductItem;
