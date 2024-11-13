
import PaymentView from '../../components/component/payment-view'
import PaymentDashBoard from '../../components/component/payment-dashboard'

export const metadata = {
  title: 'Payment-dashboard',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  
  return (
    <div>
      <PaymentDashBoard/>
       {/* <PaymentView/>  */}
    </div>
  )
}
