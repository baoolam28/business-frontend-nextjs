import ErrorPage from "../../components/ErrOr/ErrorPage"
export default function page() {

  return (
    <ErrorPage
      statusCode={403}
      message="không có quyền truy cập"
    />
  )
  
}
