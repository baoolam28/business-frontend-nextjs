"use client"
import React from 'react'
import {
  showSuccessAlert,
  showErrorAlert,
  showCustomAlert,
} from "../../utils/reactSweetAlert";
export default function page() {
  return <div>
    <button onClick={() => showSuccessAlert("success","Success Alert")}>Success Alert</button>
    <button onClick={() => showErrorAlert("error","Error Alert")}>Error Alert</button>
    <button onClick={() => showCustomAlert("Custom Alert", "Are you sure?")}>
      Custom Alert
    </button>
  </div>;
}
