import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProductItem } from '../../redux/slice/productSlice';
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
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const [productItems, setProductItems] = useState([
    {
      productId,
      productName,
      size: '',
      amount: '',
      colorCode: '',
      colorName: '',
      isCurrent: true, // Added to track the current item
    },
  ]);
  const [imageItems, setImageItems] = useState([
    {
      productId,
      imageFile: '',
      color: '',
      colorCode: '',
      image_onColor: '',
      isCurrent: true, // Added to track the current item
    },
  ]);

  const handleInputChangeImgaeObj = (field, value, index) => {
    const updatedImageItems = [...imageItems]
    updatedImageItems[index][field] = value;
    setImageItems(updatedImageItems)
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
    if (!currentProductItem.size || !currentProductItem.amount || !currentProductItem.colorCode || !currentProductItem.colorName) {
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
    if (!currentImageItem.imageFile || !currentImageItem.color || !currentImageItem.colorCode || !currentImageItem.image_onColor) {
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
        image_onColor: '',
        isCurrent: true, // Added to track the current item
      }
    ])
  }

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


  const handleNext = async () => {
    // Validate fields for the current product item
    const currentProductItem = productItems[productItems.length - 1];
    if (!currentProductItem.size || !currentProductItem.amount || !currentProductItem.colorCode || !currentProductItem.colorName) {
      alert('Please fill in all fields for the product item.');
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Use Promise.all to wait for all dispatch calls to complete
      const responses = await Promise.all(
        productItems.map(async (item) => {
          const params = {
            product_id: item.productId,
            size: item.size,
            color: item.colorName,
            color_code: item.colorCode,
            amount: item.amount,
          };

          try {
            const response = await dispatch(createProductItem(params));
            if (response?.status === 201) {
              // Extract product ID and name from the response
              const { productId } = response.data;
              // Navigate to the next page and pass data as state
              navigate("/image", { state: { productId, productName: productName } });
            } else {
              // Handle the case where the creation was not successful
              console.log("Product creation failed");
            }
            return response; // Return the response from the current iteration
          } catch (error) {
            console.log(error);
            return error; // Return the error from the current iteration
          }
        })
      );

      // Check responses if needed

      // Implement additional logic, such as posting all product items to the API

      // For now, let's log a message indicating the "Next" button was clicked
      console.log('Next button clicked');
    } finally {
      setLoading(false); // Set loading to false after all iterations are completed
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
                    type="text"
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
                    value={item.colorName}
                    onChange={(e) => handleInputChange('colorName', e.target.value, index)}
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
                    type="text"
                    id={`color-code-${index}`}
                    name={`color-code-${index}`}
                    className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                  <input 
                  type='color'
                  onChange={(e) => handleInputChangeImgaeObj('colorCode', e.target.value, index)} />
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
                    value={itemImg.colorName}
                    onChange={(e) => handleInputChangeImgaeObj('colorName', e.target.value, index)}
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
                    onChange={(e) => handleInputChangeImgaeObj('image_onColor', e.target.value, index)}
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
