import React from 'react';
import OrderStatus from './order-page';
import Layout from '../../components/home-page/Layout'
import AccountNavigation from "../../components/account-page/AccountNavigation";
const OrderStatusPage = () => {
    return (
        <Layout>
            <main className="flex justify-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
                <div className="flex w-full ml-20">
                    <AccountNavigation />
                    <div className="flex flex-col w-full ml-20 max-md:ml-0">
                        <OrderStatus/>
                    </div>
                </div>
            </main>
        </Layout>
        
    );
}

export default OrderStatusPage;

