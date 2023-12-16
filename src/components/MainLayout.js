import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import{BiCategory} from 'react-icons/bi'
import {LiaSitemapSolid} from 'react-icons/lia'
import {BsBagCheck, BsShop, BsCardImage} from 'react-icons/bs'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" >
                    <h2 className='lo  text-white text-center py-3 mb-0 text-xl content-center justify-center'>
                        <span className='sm-logo'>TA</span>
                        <span className='lg-logo'>Trendy Admin</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === "signout") {

                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard style={{ fontSize: '20px' }} />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customer',
                            icon: <AiOutlineUser style={{ fontSize: '20px' }}/>,
                            label: 'Customer',
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineShoppingCart style={{ fontSize: '20px' }} />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart style={{ fontSize: '20px' }} />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineShoppingCart style={{ fontSize: '20px' }} />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'product-item',
                                    icon: <LiaSitemapSolid style={{ fontSize: '20px' }} />,
                                    label: 'Add Product Item',
                                },
                                {
                                    key: 'product-item-list',
                                    icon: <LiaSitemapSolid style={{ fontSize: '20px' }} />,
                                    label: 'Product Item List',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategory style={{ fontSize: '20px' }} />,
                                    label: 'Add Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <BiCategory style={{ fontSize: '20px' }} />,
                                    label: 'Category List',
                                },
                            ]
                        },
                        {
                            key: 'user-cart',
                            icon: <BsBagCheck style={{ fontSize: '20px' }}/>,
                            label: 'User Cart',
                        },
                        {
                            key: 'order',
                            icon: <BsShop style={{ fontSize: '20px' }}/>,
                            label: 'Order',
                        },
                        {
                            key: 'image',
                            icon: <BsCardImage style={{ fontSize: '20px' }}/>,
                            label: 'Image',
                        },

                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                        
                    />
                
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                    
                        minHeight: '100vh',
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;