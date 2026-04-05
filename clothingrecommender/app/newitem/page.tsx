"use client";
import React, { useState } from "react";
import ItemName from "@/components/EditableTitle";
import ImageViewAndUpload from "@/components/ImageViewAndUpload";
import TagList from "@/components/EditiableTagList";
import Toggle from "@/components/Toggle";

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl leading-none cursor-pointer"
        >
          <span
            className={
              (hovered || value) >= star ? "text-[#B56311]" : "text-[#E0D0B9]"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="font-bold text-[#B56311] whitespace-nowrap">{label}:</p>
      {children}
    </div>
  );
}

const inputClass =
  "bg-transparent border-b border-[#B56311] text-[#B56311] outline-none text-sm placeholder-[#B56311]/40 w-40";

export default function NewItemPage() {
  const [itemName, setItemName] = useState("New Item");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [popularity, setPopularity] = useState(0);

  function handleSave() {
    console.log("Saving item:", {
      itemName,
      color,
      brand,
      type,
      isAvailable,
      price: parseFloat(price),
      age: parseFloat(age),
      popularity,
    });
  }

  function handleCancel() {
    console.log("Cancelled");
  }

  return (
    <div className="flex items-center justify-center p-7 h-screen">
      <div className="bg-[#EFEAE4] shadow-xl rounded-xl h-full w-full flex items-center flex-col gap-y-5 p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#B56311]/80 scrollbar-track-[#E0D0B9]/80">
        <ItemName itemName={itemName} onItemNameChange={setItemName} alwaysShowEdit />
        <div className="w-full p-3 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageViewAndUpload imageLink="/profile_photo.jpg" objectFit="contain" />
          <div className="flex flex-col gap-y-4">
            <FieldRow label="Type">
              <input
                className={inputClass}
                placeholder="e.g. Sweater"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </FieldRow>
            <FieldRow label="Brand">
              <input
                className={inputClass}
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FieldRow>
            <FieldRow label="Color">
              <input
                className={inputClass}
                placeholder="#FFFFFF"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </FieldRow>
            <TagList tags={[]} listName="Item Tag(s)" />
            <TagList tags={[]} listName="Material" />
            <TagList tags={[]} listName="Occasion" />
            <FieldRow label="Is Available">
              <Toggle
                checked={isAvailable}
                onCheckedChange={() => setIsAvailable(!isAvailable)}
              />
            </FieldRow>
            <FieldRow label="Price ($)">
              <input
                className={inputClass}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FieldRow>
            <FieldRow label="Age (years)">
              <input
                className={inputClass}
                placeholder="0"
                type="number"
                min="0"
                step="0.5"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </FieldRow>
            <FieldRow label="Popularity">
              <StarRating value={popularity} onChange={setPopularity} />
            </FieldRow>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center flex-row">
          <button
            onClick={handleCancel}
            className="bg-[#E0D0B9] text-[#B56311] border border-[#B56311] rounded-lg px-3 py-1 hover:bg-[#D4C0A8] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#B56311] text-[#E0D0B9] rounded-lg px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
