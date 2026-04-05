'use client';
import { Switch } from 'radix-ui';
import React from 'react'

interface ToggleProps {
    checked: boolean;
    onCheckedChange: () => void;
}

export default function Toggle({ checked, onCheckedChange }: ToggleProps) {
  return (
    <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="
        relative h-4 w-9 rounded-full
        bg-[#E0D0B9] data-[state=checked]:bg-[#B56311]
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <Switch.Thumb
        className="
          block h-3 w-3 rounded-full bg-white shadow
          translate-x-0.5 data-[state=checked]:translate-x-[22px]
          transition-transform duration-200
        "
      />
    </Switch.Root>
  )
}
