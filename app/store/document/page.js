import Document from "../../../components/document-page/document-page";
export const metadata = {
  title: 'Document',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  return (
    <div>
      <Document />
    </div>
  );
}
