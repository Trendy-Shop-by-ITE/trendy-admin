import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProductItem, postCreateImageItem } from '../../redux/slice/productSlice';
import { useDispatch } from 'react-redux';

const AddProductItem = () => {
  const location = useLocation();
  const { state } = location;

  // Access product ID and name from state
  const productId = state?.productId;
  const productName = state?.productName;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileImage = useRef(null)
  const [selectFile, setSelectFile] = useState(null)


  const [productItems, setProductItems] = useState([
    {
      productId,
      productName,
      size: '',
      amount: '',
      colorCode: '',
      isCurrent: true, // Added to track the current item
    },
  ]);
  const [imageItems, setImageItems] = useState([
    {
      productId,
      imageFile: '',
      color: '',
      colorCode: '',
      isCurrent: true, // Added to track the current item
    },
  ]);

  const handleInputChangeImgaeObj = (field, value, index) => {
    const updatedImageItems = [...imageItems]
    updatedImageItems[index][field] = value;
    setImageItems(updatedImageItems)
  }
  const handleInputChangeImgaeFile = (field, e, index) => {
    const file = e.target.files[0];
    console.log(file);
    const updatedImageItems = [...imageItems];
    updatedImageItems[index][field] = file;
    setImageItems(updatedImageItems);
  }


  const handleInputChange = (field, value, index) => {
    // Update the value of the specified field for the product item at the given index
    const updatedProductItems = [...productItems];
    updatedProductItems[index][field] = value;
    setProductItems(updatedProductItems);
  };

  const handleAddProductItem = () => {
    // Validate fields for the current product item
    const currentProductItem = productItems[productItems.length - 1];
    if (!currentProductItem.size || !currentProductItem.amount) {
      alert('Please fill in all fields for the product item.');
      return;
    }

    // Add a new product item to the state
    setProductItems((prevItems) => [
      ...prevItems,
      {
        productId,
        productName,
        size: '',
        amount: '',
        colorCode: '',
        colorName: '',
        isCurrent: true,
      },
    ]);
  };
  const handleAddImageItem = () => {
    console.log(imageItems)
    const currentImageItem = imageItems[imageItems.length - 1];
    if (!currentImageItem.imageFile || !currentImageItem.color || !currentImageItem.colorCode) {
      alert('Please fill in all fields for the image item.');
      return;
    }

    setImageItems((prevItems) => [
      ...prevItems,
      {
        productId,
        imageFile: '',
        color: '',
        colorCode: '',
        isCurrent: true, // Added to track the current item
      }
    ])
  }

  const handleClearImage = () => {
    // Clear the form fields for the last product item
    const updatedImageItems = [...imageItems];
    updatedImageItems[updatedImageItems.length - 1] = {
      productId,
      imageFile: '',
      color: '',
      colorCode: '',
      isCurrent: true,
    };
    setImageItems(updatedImageItems);
  };

  const handleClear = () => {
    // Clear the form fields for the last product item
    const updatedProductItems = [...productItems];
    updatedProductItems[updatedProductItems.length - 1] = {
      productId,
      productName,
      size: '',
      amount: '',
      colorCode: '',
      colorName: '',
      isCurrent: true,
    };
    setProductItems(updatedProductItems);
  };

  const handleDelete = (index) => {
    // Remove the specified product item from the state
    if (index !== productItems.length - 1) {
      const updatedProductItems = productItems.filter((item, i) => i !== index);
      setProductItems(updatedProductItems);
    } else {
      alert('Cannot delete the current item. Use "Clear" to remove its content.');
    }
  };
  const handleDeleteImgItem = (index) => {
    // Remove the specified product item from the state
    if (index !== imageItems.length - 1) {
      const updatedImageItem = imageItems.filter((item, i) => i !== index);
      setImageItems(updatedImageItem);
    } else {
      alert('Cannot delete the current item. Use "Clear" to remove its content.');
    }
  };


  const handleNext = async () => {
    // Validate fields for the current product item
    const currentProductItem = productItems[productItems.length - 1];
    if (!currentProductItem.size || !currentProductItem.amount) {
      alert('Please fill in all fields for the product item.');
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Use Promise.all to wait for all dispatch calls to complete
      const productResponses = await Promise.all(
        productItems.map(async (item) => {
          const params = {
            product_id: item.productId,
            size: item.size,
            color: item.colorCode,
            color_code: item.colorCode,
            amount: item.amount,
          };

          try {
            const response = await dispatch(createProductItem(params));

            if (response?.status === 201) {
              const { productId } = response.data;
            } else {
              console.log("Product creation failed");
            }

            return response;
          } catch (error) {
            console.log(error);
            return error;
          }
        })
      );

      const imageResponses = await Promise.all(
        imageItems.map(async (imageItem) => {
          const formData = new FormData();
          formData.append('product_id', imageItem.productId);
          formData.append('image', imageItem.imageFile);
          formData.append('color', imageItem.color);
          formData.append('color_code', imageItem.colorCode);
          formData.append('image_onColor', imageItem.colorCode);

          try {
            const imageResponse = await dispatch(postCreateImageItem(formData));

            if (imageResponse?.status === 201) {
              // Handle image item creation success
              console.log('Image item creation successful');
            } else {
              console.log("Image item creation failed");
            }

            return imageResponse;
          } catch (error) {
            console.log(error);
            return error;
          }
        })
      );


      // Check responses if needed

      // Implement additional logic, such as posting all product and image items to the API

      // For now, let's log a message indicating the "Next" button was clicked
      console.log('Next button clicked');
      // Alert success after both API calls have completed
      navigate(-1)
    } finally {
      setLoading(false);
    }
  };



  const handleFinish = () => {
    // Implement logic for "Finish" button
    // This could include posting the current product item and finishing the current page
    console.log('Finish button clicked');
  };

  return (
    <div>
      <h2 className='mb-4 text-3xl font-bold'>Add Product Item</h2>
      <div className='bg bg- bg-white p-1 rounded-lg'>
        <div className=' mt-5 ms-5'>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information of {productName}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Please fill the form for create item.
          </p>
          {productItems.map((item, index) => (
            <div key={index} className="w-1/2 mt-3 mb-4 mx-auto p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`size-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Size
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id={`size-${index}`}
                    name={`size-${index}`}
                    autoComplete={`size-${index}`}
                    value={item.size}
                    onChange={(e) => handleInputChange('size', e.target.value, index)}
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

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`amount-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Amount
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="number"
                    id={`amount-${index}`}
                    name={`amount-${index}`}
                    value={item.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value, index)}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`color-code-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Color Code
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="color"
                    id={`color-code-${index}`}
                    name={`color-code-${index}`}
                    value={item.colorCode}
                    onChange={(e) => handleInputChange('colorCode', e.target.value, index)}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`color-name-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Color Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id={`color-name-${index}`}
                    name={`color-name-${index}`}
                    readOnly = {true}
                    value={item.colorCode}
                    
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                {index === productItems.length - 1 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Clear
                  </button>
                )}
                {index !== productItems.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <hr
            class="my-12 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />

          <h2 className=' mt-3 text-xl text-black font-bold'>Image Item</h2>
          {imageItems.map((itemImg, index) => (
            <div key={index} className="w-1/2 mt-3 mb-4 mx-auto p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`amount-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Image File
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    id="file_input"
                    type="file"
                    accept='.png, .jpg'
                    ref={fileImage}
                    onChange={(e) => handleInputChangeImgaeFile('imageFile', e, index)}
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

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`color-code-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Color Code
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    readOnly={true}
                    value={itemImg.colorCode}
                    type="color"
                    onChange={(e) => handleInputChangeImgaeObj('colorCode', e.target.value, index)} 
                    id={`color-code-${index}`}
                    name={`color-code-${index}`}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>

              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`color-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Color Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id={`color-${index}`}
                    name={`color-${index}`}
                    value={itemImg.colorName}
                    onChange={(e) => handleInputChangeImgaeObj('color', e.target.value, index)}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={`color-code-${index}`} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Image On Color
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    readOnly={true}
                    type="text"
                    id={`color-code-${index}`}
                    name={`color-code-${index}`}
                    value={itemImg.colorCode}
                    // onChange={(e) => handleInputChangeImgaeObj('image_onColor', e.target.value, index)}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                {index === imageItems.length - 1 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Clear
                  </button>
                )}
                {index !== imageItems.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>
        <div className="fixed bottom-8 right-8">
          <button
            type="button"
            onClick={handleAddProductItem}
            className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleAddImageItem}
            className=" ms-3 inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add Image
          </button>
        </div>

        <div className=' mt-4 mb-4'>
          <button
            type="button"
            onClick={handleNext}
            className=" inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="ms-4 inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Finish
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductItem;
