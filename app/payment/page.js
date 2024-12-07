
import PaymentView from '../../components/component/payment-view'
import PaymentDashBoard from '../../components/component/payment-dashboard'
import { Suspense } from "react";
import Loading from "../../components/component/loading-lottie";
import Animation from "../../utils/lottie-animations/astronot.json";
export default function page() {
  return (
    <div>
      <Suspense fallback={<Loading animation={Animation} />}>
        <PaymentDashBoard />
      </Suspense>
    </div>
  );
}
