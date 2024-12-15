import React from 'react';
import OrderStatus from './order-page';
import Layout from '../../components/home-page/Layout'
import AccountNavigation from "../../components/account-page/AccountNavigation";
const OrderStatusPage = () => {
    return (
        <Layout>
            <main className="flex justify-center items-start mx-auto mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
                <div className="flex w-full space-x-10">
                    <AccountNavigation />
                    <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
                        <OrderStatus/>
                    </div>
                </div>
            </main>
        </Layout>
        
    );
}

export default OrderStatusPage;

