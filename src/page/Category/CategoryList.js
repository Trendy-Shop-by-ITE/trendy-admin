import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopLevelCategory } from '../../redux/slice/categorySlice';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoryContent from './page/CategoryContent';

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state?.root?.category?.data);
  const dispatch = useDispatch();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const initData = async () => {
    setIsLoading(true);
    let response = {};
    try {
      response = await dispatch(getTopLevelCategory());

      console.log(`response = ${response}`)

      // Set the default selected category if available
      if (response && response.length > 0) {
        setSelectedCategoryId(response[0].id);
      }
    } catch (error) {
      console.log(error);
      response = error;
    }
    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    initData();
  }, []);


  return (
    <div className='bg-white p-4 rounded-lg'>


      <h2 className='mb-4 text-3xl font-bold'>Category</h2>
      <Tabs>
        <TabList>
          {/* Render dynamic tabs for top-level categories */}
          {data?.map((category) => (
            <Tab key={category.id} selected={selectedCategoryId === category.id}>
              {category.name}
            </Tab>
          ))}
        </TabList>
        <div>
          {/* Render CategoryContent with the selected top-level category ID */}
          {data?.map((category) => (
            <TabPanel key={category.id}>
              <CategoryContent id={category.id} key={category.id} />
            </TabPanel>
          ))}
        </div>

      </Tabs>
    </div>
  );
};

export default CategoryList;
