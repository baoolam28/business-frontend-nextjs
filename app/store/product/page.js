import Product from "../../../components/component/dashboard-product";
export const metadata = {
  title: 'Online',
  description: 'This is a description for My Custom Site',
};
export default function product() {
  return (
    <div>
      <Product />
    </div>
  );
}
