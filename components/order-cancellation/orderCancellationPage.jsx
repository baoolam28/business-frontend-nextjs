import React from 'react';
import OrderCancellation from './order-cancellation';
import Layout from '../../components/home-page/Layout'
import AccountNavigation from "../../components/account-page/AccountNavigation";
import { Suspense } from 'react';
import Loading from "../../components/component/loading-lottie"
import Animation from "../../utils/lottie-animations/astronot.json"
const OrderCancellationPage = () => {
    return (
        <Layout>
            <main className="flex justify-center items-start mx-auto mt-20 w-full max-w-6xl max-md:mt-10">
                <div className="flex w-full space-x-10">
                    <AccountNavigation />
                    <div className="flex flex-col w-full flex-grow ml-10">
                        <Suspense fallback={<Loading animation={Animation}/>}>
                            <OrderCancellation />
                        </Suspense>
                    </div>
                </div>
            </main>
        </Layout>
        
    );
}

export default OrderCancellationPage;