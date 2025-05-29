"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { categories } from "@/lib/data"
import { Star } from "@/components/ui/star"

export function ProductFilters({ activeFilters, onFilterChange, onClose }) {
  const colors = ["Black", "White", "Gray", "Blue", "Red", "Green", "Brown", "Beige", "Navy", "Burgundy"]
  const sizes = [
    "4x6",
    "5x7",
    "8x10",
    "10 inch",
    "12 inch",
    "16 inch",
    "18 inch",
    "20 inch",
    "24 inch",
    "Small",
    "Medium",
    "Large",
    "Standard",
    "Set of 3",
    "Set of 5",
    "12x16 (holds 5 photos)",
    "16x20 (holds 8 photos)"
  ]
  const priceRanges = [
    { label: "Under ₹1,000", value: "0-1000" },
    { label: "₹1,000 - ₹2,000", value: "1000-2000" },
    { label: "₹2,000 - ₹3,000", value: "2000-3000" },
    { label: "₹3,000 - ₹5,000", value: "3000-5000" },
    { label: "Over ₹5,000", value: "5000-50000" },
  ]

  // Price range slider
  const [priceRange, setPriceRange] = useState([0, 5000])

  const handlePriceRangeChange = (value) => {
    setPriceRange(value)
    const priceRangeStr = `${value[0]}-${value[1]}`
    onFilterChange("price", priceRangeStr)
  }

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["category", "price", "color", "size", "rating"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="keyboard-focus">Category</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={activeFilters.category} onValueChange={(value) => onFilterChange("category", value)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="category-all" className="keyboard-focus" />
                  <Label htmlFor="category-all" className="cursor-pointer">
                    All Categories
                  </Label>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={category.id} id={`category-${category.id}`} className="keyboard-focus" />
                    <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="keyboard-focus">Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                  <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                </div>
                <Slider
                  defaultValue={[0, 5000]}
                  min={0}
                  max={10000}
                  step={500}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="keyboard-focus"
                  aria-label="Price range"
                />
              </div>

              <div className="space-y-2">
                <RadioGroup value={activeFilters.price} onValueChange={(value) => onFilterChange("price", value)}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="price-all" className="keyboard-focus" />
                      <Label htmlFor="price-all" className="cursor-pointer">
                        All Prices
                      </Label>
                    </div>
                    {priceRanges.map((range) => (
                      <div key={range.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={range.value} id={`price-${range.value}`} className="keyboard-focus" />
                        <Label htmlFor={`price-${range.value}`} className="cursor-pointer">
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="keyboard-focus">Color</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={activeFilters.color} onValueChange={(value) => onFilterChange("color", value)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="color-all" className="keyboard-focus" />
                  <Label htmlFor="color-all" className="cursor-pointer">
                    All Colors
                  </Label>
                </div>
                {colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} className="keyboard-focus" />
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-hidden="true"
                    />
                    <Label htmlFor={`color-${color}`} className="cursor-pointer">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="keyboard-focus">Size</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={activeFilters.size} onValueChange={(value) => onFilterChange("size", value)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="size-all" className="keyboard-focus" />
                  <Label htmlFor="size-all" className="cursor-pointer">
                    All Sizes
                  </Label>
                </div>
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} className="keyboard-focus" />
                    <Label htmlFor={`size-${size}`} className="cursor-pointer">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="keyboard-focus">Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={activeFilters.rating} onValueChange={(value) => onFilterChange("rating", value)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="rating-all" className="keyboard-focus" />
                  <Label htmlFor="rating-all" className="cursor-pointer">
                    All Ratings
                  </Label>
                </div>
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="keyboard-focus" />
                    <Label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-1">& Up</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
