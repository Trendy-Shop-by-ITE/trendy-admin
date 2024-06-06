import React, { useEffect, useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { getTopLevelCategory } from '../../redux/slice/categorySlice';
import { getSubCategoryLevel } from '../../redux/slice/subCategorySlice';
import { createProductMain } from '../../redux/slice/productSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import AddProductItem from './AddProductItem';

const AddProduct = ({ isVisible, onCancel, onOk }) => {
  const typteData = useSelector((state) => state?.root?.category?.data);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const categoryData = useSelector((state) => state?.root?.subCategory?.data)
  const [selectedType, setSelectedType] = useState();
  const [categoryId, setCategoryId] = useState()
  const [productName, setProductName] = useState()
  const [productPrice, setProductPrice] = useState()
  const [productDiscount, setProductDiscount] = useState()
  const [productDesc, setProductDesc] = useState()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (event) => {
    const selectedTypeId = event.target.value;
    setSelectedType(selectedTypeId);
    // Now fetch subcategories based on the selected type
    dispatch(getSubCategoryLevel(selectedTypeId));

  };
  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value, 10)
    console.log(categoryId)
    setCategoryId(categoryId);
  }


  // const initTypeData = async () => {
  //   try {
  //     const response = await dispatch(getTopLevelCategory());
  //     // Set the default selected category if available
  //     if (response && response.length > 0) {
  //       const defaultSelectedCategoryId = response[0].id;
  //       setSelectedCategoryId(defaultSelectedCategoryId);
  //       // Now fetch subcategories based on the default selected type
  //       dispatch(getSubCategoryLevel(defaultSelectedCategoryId));
  //       if (categoryData && categoryData.length > 0) {
  //         console.log(`test id = ${categoryData[0].id}`)
  //         setCategoryId(categoryData[0].id);
  //       }

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleOk = async() => {
    console.log('Ok button clicked');
   // Ensure onOk is being called
    setLoading(true);

    const params = {
      "category_id": categoryId,
      "product_name": productName,
      "product_price": productPrice,
      "product_discount": productDiscount,
      "product_description": productDesc
    }

    let response = {};

    try {
      const response = await dispatch(createProductMain(params));

      if (response?.status === 201) {
        // Extract product ID and name from the response
        const { productId } = response.data;
        const addItemVisitGift = true
        const proName = params.product_name
        // Navigate to the next page and pass data as state
        // onOk(productId);
        const dataSend = {
          "productId": productId,
          "productName": proName,
          "addItemVisitble": addItemVisitGift
        }
        onOk(dataSend)
        // navigate("/product-item", { state: { productId: productId, productName: params.product_name } });
      } else {
        // Handle the case where the creation was not successful
        console.log("Product creation failed");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    return response;
  };
  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const response = await dispatch(getTopLevelCategory());
        if (response && response.length > 0) {
          const defaultSelectedCategoryId = response[0].id;
          setSelectedCategoryId(defaultSelectedCategoryId);
          dispatch(getSubCategoryLevel(defaultSelectedCategoryId));
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch top-level categories
    initializeData();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // Set the default value of categoryId when subcategories are loaded
    if (categoryData.length > 0) {
      setCategoryId(categoryData[0].id);
    }
  }, [categoryData]);

  const createProductHandle = async (e) => {

    setLoading(true);

    const params = {
      "category_id": categoryId,
      "product_name": productName,
      "product_price": productPrice,
      "product_discount": productDiscount,
      "product_description": productDesc
    }

    let response = {};

    try {
      const response = await dispatch(createProductMain(params));

      if (response?.status === 201) {
        // Extract product ID and name from the response
        const { productId } = response.data;

        // Navigate to the next page and pass data as state
        navigate("/product-item", { state: { productId: productId, productName: params.product_name } });
      } else {
        // Handle the case where the creation was not successful
        console.log("Product creation failed");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    return response;
  }

  // useEffect(() => {
  //   // Fetch top-level categories
  //   initTypeData();
  // }, []);




  return (
    <Modal
      visible={isVisible}
      title=" "
      onOk={handleOk}
      onCancel={handleCancel}
      width={'60%'}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            type="primary"
            onClick={handleOk}
            className=' bg-blue-600 hover:bg-blue-400'
          >
            Next
          </Button>
        </>
      )}
    >
      <div>
        <h2 className='mb-4 text-3xl font-bold'>Add Product</h2>
        <div className='bg bg- bg-white p-1 rounded-lg'>
          <div className=' mt-5 ms-5'>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Please fill the form for create product.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Product name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    onChange={(e) => setProductName(e.target.value)}
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
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Category
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    onChange={handleCategoryChange}
                    value={categoryId}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >

                    {categoryData?.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}


                  </select>
                </div>
              </div>


              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="product-price" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Product Price
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="product-price"
                    id="product-price"
                    onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Product Discount
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="discount"
                    id="discount"
                    onChange={(e) => setProductDiscount(parseInt(e.target.value, 10))}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Product Description
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            onClick={createProductHandle}
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </button>
        </div> */}


        </div>
      </div>
    </Modal>


  )
}

export default AddProduct