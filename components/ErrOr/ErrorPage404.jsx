import React from "react";
import ErrorPageContent from "./ErrorPage";

export default function ErrorPage() {
  return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorPageContent 
          statusCode={404}
          message={"Không tìm thấy trang"}
        />
      </React.Suspense>
  );
}

