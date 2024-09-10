import axiosClient from "./axiosClient";

const document = {
  // Fetch all documents
  getAllDocument() {
    const url = "/documents";
    return axiosClient.get(url);
  },

  // Create a new document
  createDocument(documentData) {
    const url = "/documents";
    return axiosClient.post(url, documentData);
  },

  // Update an existing document
  updateDocument(documentId, documentData) {
    const url = `/documents/${documentId}`;
    return axiosClient.put(url, documentData);
  },

  // Delete a document
  deleteDocument(documentId) {
    const url = `/documents/${documentId}`;
    return axiosClient.delete(url);
  },
};

export default document;
