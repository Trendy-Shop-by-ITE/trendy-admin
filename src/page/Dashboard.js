import React from 'react'
import { Column } from '@ant-design/plots';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs'
import { Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const Dashboard = () => {
    const data = [
        {
            type: 'Jan',
            sales: 38,
        },
        {
            type: 'Feb',
            sales: 52,
        },
        {
            type: 'Mar',
            sales: 61,
        },
        {
            type: 'Apr',
            sales: 145,
        },
        {
            type: 'May',
            sales: 48,
        },
        {
            type: 'Jun',
            sales: 38,
        },
        {
            type: 'Jul',
            sales: 38,
        },
        {
            type: 'Aug',
            sales: 38,
        },
        {
            type: 'Sep',
            sales: 38,
        },
        {
            type: 'Oct',
            sales: 38,
        },
        {
            type: 'Nov',
            sales: 38,
        },
        {
            type: 'Dec',
            sales: 38,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return "#DB3022"
        },
        label: {

            position: 'middle',

            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Months',
            },
            sales: {
                alias: 'Income',
            },
        },
    };
    return (
        <div>
            <h3 className='mb-4'>Dashboard</h3>
            <div className='con flex justify-between items-center gap-3 '>
                <div className='flex flex-1 justify-between  items-end bg-white p-6 rounded-md  '>
                    <div>
                        <p className='mb-4 text-lg'>Total</p>
                        <h4 className='text-lg text-black font-bold'>$1100</h4>
                    </div>
                    <div className='flex flex-col items-end'>
                        <h6 className='green mb-4 flex justify-between'><BsArrowUpRight className='me-2' /> 32%</h6>
                        <p className='mb-0'>Compare to April 2023</p>

                    </div>
                </div>
                <div className='flex flex-1 justify-between items-end bg-white p-6 rounded-md  '>
                    <div>
                        <p className='mb-4 text-lg'>Total</p>
                        <h4 className='text-lg text-black font-bold'>$1100</h4>

                    </div>
                    <div className='flex flex-col items-end'>
                        <h6 className='red mb-4 flex justify-between'><BsArrowDownRight className='me-2' /> 32%</h6>
                        <p className='mb-0'>Compare to April 2023</p>

                    </div>
                </div>
                <div className='flex flex-1 justify-between items-end bg-white p-6 rounded-md  '>
                    <div>
                        <p className='mb-4 text-lg'>Total</p>
                        <h4 className='text-lg text-black font-bold'>$1100</h4>

                    </div>
                    <div className='flex flex-col items-end'>
                        <h6 className='green mb-4 flex justify-between'><BsArrowUpRight className='me-2' /> 32%</h6>
                        <p className='mb-0'>Compare to April 2023</p>

                    </div>
                </div>
            </div>

            <div className='flex justify-between gap-3'>
                <div className='mt-6 flex-grow flex-1'>
                    <h2 className='mb-4 text-3xl font-bold'>Income Statistic</h2>
                    <div>
                        <Column {...config} />
                    </div>
                </div>

                <div className='mt-6 flex-grow flex-1'>
                    <h2 className='mb-4 text-3xl font-bold'>Recent Order</h2>
                    <div>
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard