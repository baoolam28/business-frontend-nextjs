'use client'

import React, { useState, useEffect } from "react"
import { Separator } from "../../components/ui/separator"
import { Button } from "../../components/ui/button"
import { MinusIcon, PlusIcon, RefreshCw } from "lucide-react"
import BuyNow from "../../components/component/buy-now-button"
import AddToCart from "../../components/component/add-to-cart-button"
import FormatAsVND from "../../utils/formatVND"
import QuantitySelector from "../../components/product-details/QuantitySelector"


function AttributeSelector({ attribute, options, selectedValue, availableOptions, onChange }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-900 mb-2">{attribute}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={selectedValue === option ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(option)}
            disabled={!availableOptions.includes(option)}
            className="px-3 py-1 rounded-full text-sm"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function ProductInfo({ productData, onVariantImage }) {
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [filteredVariant, setFilteredVariant] = useState(null)
  const [availableOptions, setAvailableOptions] = useState({})
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity)
  }

  useEffect(() => {
    if (Object.keys(selectedAttributes).length > 0) {
      const matchingVariant = productData?.variants.find((variant) =>
        Object.keys(selectedAttributes).every(
          (key) => variant.attributes[key] === selectedAttributes[key]
        )
      )
      setFilteredVariant(matchingVariant)
      onVariantImage(matchingVariant ? matchingVariant.image : null)
    } else {
      setFilteredVariant(null)
      onVariantImage(null)
    }
  }, [selectedAttributes, productData?.variants, onVariantImage])

  const attributeOptions = {}
  productData?.variants.forEach((variant) => {
    Object.keys(variant.attributes).forEach((attrKey) => {
      if (!attributeOptions[attrKey]) {
        attributeOptions[attrKey] = new Set()
      }
      attributeOptions[attrKey].add(variant.attributes[attrKey])
    })
  })

  const attributes = Object.keys(attributeOptions).reduce((acc, key) => {
    acc[key] = Array.from(attributeOptions[key])
    return acc
  }, {})

  useEffect(() => {
    const newAvailableOptions = {}
    productData?.variants.forEach((variant) => {
      Object.keys(variant.attributes).forEach((attrKey) => {
        if (!newAvailableOptions[attrKey]) {
          newAvailableOptions[attrKey] = new Set()
        }
        const isMatching = Object.keys(selectedAttributes).every(
          (key) =>
            key === attrKey ||
            !selectedAttributes[key] ||
            variant.attributes[key] === selectedAttributes[key]
        )
        if (isMatching) {
          newAvailableOptions[attrKey].add(variant.attributes[attrKey])
        }
      })
    })

    setAvailableOptions(
      Object.keys(newAvailableOptions).reduce((acc, key) => {
        acc[key] = Array.from(newAvailableOptions[key])
        return acc
      }, {})
    )
  }, [selectedAttributes, productData?.variants])

  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }))
  }

  const resetSelection = () => {
    setSelectedAttributes({})
    setFilteredVariant(null)
  }

  return (
    <div className="flex flex-col w-full lg:w-[36%] lg:ml-5 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {productData?.productName}
        </h2>
        <div className="text-2xl font-semibold text-red-600 mb-4">
          {filteredVariant
            ? FormatAsVND(filteredVariant.price)
            : FormatAsVND(productData.price)}
        </div>
        <p className="text-gray-600 mb-6">{productData.productDescription}</p>
        <Separator className="my-6" />

        {Object.keys(attributes).map((attrKey) => (
          <AttributeSelector
            key={attrKey}
            attribute={attrKey}
            options={attributes[attrKey]}
            selectedValue={selectedAttributes[attrKey]}
            availableOptions={availableOptions[attrKey] || []}
            onChange={(value) => handleAttributeChange(attrKey, value)}
          />
        ))}

        <Button
          onClick={resetSelection}
          variant="ghost"
          size="sm"
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Selection
        </Button>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <QuantitySelector
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
          <div className="flex gap-4 w-full">
            <BuyNow
              id={filteredVariant?.productDetailId}
              quantity={quantity}
              className="flex-1"
            />
            <AddToCart
              id={filteredVariant?.productDetailId}
              quantity={quantity}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}