import React from "react";
import Layout from "./Layout";
import ErrorPageContent from "./ErrorPage";

export default function ErrorPage() {
  return (
    <Layout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorPageContent />
      </React.Suspense>
    </Layout>
  );
}

