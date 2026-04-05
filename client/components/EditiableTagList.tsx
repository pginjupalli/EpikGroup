"use client";
import React from "react";
import { useState } from "react";
import Tag from "./Tag";

interface TagList {
  tags: Array<string>;
  listName: string;
}

export default function TagList({ tags, listName }: TagList) {
  const [list, setList] = useState(tags);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  function deleteTag(tagToDelete: string) {
    const newList = list.filter((tag) => tag !== tagToDelete);
    setList(newList);
  }

  function addTag(newTag: string) {
    if (newTag.trim() === "") return;
    if (list.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) return;

    setList([...list, newTag]);
    setNewTagInput("");
    setIsAddingTag(false);
  }

  return (
    <div className="flex flex-wrap items-center text-[#B56311] w-fit">
      <p className="font-bold inline">{listName}:</p>{" "}
      {list.map((tag: string) => (
        <Tag phrase={tag} key={tag} deleteTag={deleteTag} />
      ))}
      {isAddingTag ? (
        <input
          className="bg-[#B56311] text-[#E0D0B9] text-sm font-bold rounded-2xl px-2.5 py-0.5 mx-0.5 align-middle outline-none"
          type="text"
          autoFocus
          onChange={(e) => setNewTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag(newTagInput)}
        />
      ) : (
        <button
          className="font-bold cursor-pointer"
          onClick={() => setIsAddingTag(true)}
        >
          +
        </button>
      )}
    </div>
  );
}
