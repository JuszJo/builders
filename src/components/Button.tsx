import React from "react";

type CustomButton = {
  custom_value: string
}

export function Button(props: React.ComponentProps<"button"> & CustomButton) {
  return (
    <div>
      <button {...props} >{props.custom_value}</button>
    </div>
  )
}

export function RoundedButton({ className = "", ...rest }: React.ComponentProps<"button"> & CustomButton) {

  return (
    <Button
      {...rest}
      className={`
        ${className}
        rounded-full h-[40px] px-4 cursor-pointer
        bg-white text-[var(--bg)] hover:bg-neutral-200
        font-semibold text-[14px]
      `}
    />
  )
}