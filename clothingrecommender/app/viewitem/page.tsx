"use client";
import React from "react";
import ItemName from "@/components/EditableTitle";
import ImageViewAndUpload from "@/components/ImageViewAndUpload";
import TagList from "@/components/EditiableTagList";
import Description from "@/components/EditableDescription";
import Toggle from "@/components/Toggle";
import { useState } from "react";
import HeartButton from "@/components/FavoriteButton";
import CarouselGroup from "@/components/CarouselGroup";
import Divider from "@/components/Divider";

export default function ViewItemPage() {
  // Test data which would have to be queried from the DB
  const [itemName, setItemName] = useState("Leopard Print Sweater");
  const [imageURL, setImageURL] = useState("/profile_photo.jpg");
  const [tagList, setTagList] = useState([
    "Casual",
    "Winter",
    "Cozy",
    "Animal Print",
  ]);
  const [description, setDescription] = useState(
    "A warm and cozy leopard print sweater perfect for casual winter outings.",
  );

  const [isAvailable, setIsAvailable] = useState(true);
  const onIsAvailableChange = () => {
    setIsAvailable(!isAvailable);
    if (!isAvailable) {
      console.log("Item is now available");
    } else {
      console.log("Item is no longer available");
    }
  };

  const [isLiked, setIsLiked] = useState(false);
  const onLikeToggle = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      console.log("Item unliked");
    } else {
      console.log("Item liked");
    }
  };

  const [outfitImages, setOutfitImages] = useState([
    {
      src: "/profile_photo.jpg",
      name: "Outfit 1",
      url: "https://www.google.com",
    },
    {
      src: "/profile_photo.jpg",
      name: "Outfit 2",
    },
    {
      src: "/profile_photo.jpg",
      name: "Outfit 3",
    },
    {
      src: "/profile_photo.jpg",
      name: "Outfit 4",
    },
  ]);

  return (
    <div className="flex items-center justify-center p-7 h-screen">
      <div className="bg-[#EFEAE4] border-2 border-[#B56311] h-full w-full flex items-center flex-col gap-y-5 p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#B56311]/80 scrollbar-track-[#E0D0B9]/80">
        <ItemName itemName={itemName} onItemNameChange={setItemName} />
        <div className="w-full p-3 flex flex-wrap gap-8 items-center justify-center">
          <ImageViewAndUpload imageLink={imageURL} />
          <div className="w-3xl flex flex-col gap-y-10 items-center">
            <div className="flex flex-col items-center gap-y-1">
              <TagList tags={tagList} listName="Item Tag(s)" />
              <Description
                description={description}
                descriptionName="Item Description"
              />
              <div className="flex items-center gap-2">
                <p className="font-bold inline text-[#B56311]">
                  Is Available:{" "}
                </p>
                <Toggle
                  checked={isAvailable}
                  onCheckedChange={onIsAvailableChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center flex-row flex-wrap mt-4">
              <button className="bg-[#B56311] text-[#E0D0B9] px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200">
                Create Outfit
              </button>
              <button className="bg-[#B56311] text-[#E0D0B9] px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200">
                Delete Item
              </button>
              <HeartButton liked={isLiked} onClick={onLikeToggle} />
            </div>
          </div>
        </div>
        <Divider />
        <CarouselGroup images={outfitImages} groupName="Existing Outfits" />
        <Divider />
        <CarouselGroup images={outfitImages} groupName="Similar Items" />
      </div>
    </div>
  );
}
