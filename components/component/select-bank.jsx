'use client'

import { useState } from 'react'
import Select from 'react-select'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import Banks from "../../utils/BankData"

export default function BankAccountForm() {
  const [selectedBank, setSelectedBank] = useState(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!selectedBank) {
      setError('Please select a bank')
      return
    }

    if (!accountNumber || !/^\d+$/.test(accountNumber)) {
      setError('Please enter a valid account number')
      return
    }

    // Handle form submission here
    console.log('Form submitted', { bank: selectedBank, accountNumber })
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#e2e8f0',
      '&:hover': {
        borderColor: '#cbd5e1',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    input: (provided) => ({
      ...provided,
      color: 'black',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'none' : state.isFocused ? 'none' : 'none',
      color: state.isSelected ? 'black' : 'black',
    }),
  }

  const customFilterOption = (option, searchText) => {
    const { shortName } = option.data;
    return shortName.toLowerCase().includes(searchText.toLowerCase());
  };

  const handleInputChange = (inputValue) => {
    // Perform actions with the input value
    console.log('Search Input:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <Label htmlFor="bank-select">Select Bank</Label>
          <Select
            id="bank-select"
            options={Banks}
            styles={customStyles}
            value={selectedBank}
            onChange={setSelectedBank}
            placeholder="Search for a bank..."
            formatOptionLabel={({ shortName, logo }) => (
              <div className="flex items-center">
                <img src={logo} alt={shortName} className="w-15 h-8 mr-2" />
                <span>{shortName}</span>
              </div>
            )}
            filterOption={customFilterOption}
            onInputChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="account-number">Account Number</Label>
          <Input
            id="account-number"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter your account number"
            className="mt-1"
          />
        </div>
        {error && (
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  )
}
