
import PaymentView from '../../components/component/payment-view'
import PaymentDashBoard from '../../components/component/payment-dashboard'
export default function page() {
  
  return (
    <div>
      <Suspense fallback={<Loading animation={Animation} />}>
        <PaymentDashBoard />
      </Suspense>
    </div>
  );
}
