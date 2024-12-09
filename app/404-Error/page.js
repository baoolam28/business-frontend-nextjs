import Error from "../../components/ErrOr/ErrorPage404";
export const metadata = {
  title: '404',
  description: 'This is a description for My Custom Site',
};


const ErrorPage = () => {
  return (
    <>
        <Error/>
      </>
  )
};
export default ErrorPage;