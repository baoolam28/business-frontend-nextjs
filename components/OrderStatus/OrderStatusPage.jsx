import React from 'react';
import OrderStatus from './order-page';
import Layout from '../../components/home-page/Layout'
import AccountNavigation from "../../components/account-page/AccountNavigation";
const OrderStatusPage = () => {
    return (
        <Layout>
            <main className="flex justify-center items-start mx-auto mt-20 w-full max-w-6xl max-md:mt-10">
                <div className="flex w-full space-x-10">
                    <AccountNavigation />
                    <div className="flex flex-col w-full flex-grow ml-10">
                        <OrderStatus/>
                    </div>
                </div>
            </main>
        </Layout>
        
    );
}

export default OrderStatusPage;

