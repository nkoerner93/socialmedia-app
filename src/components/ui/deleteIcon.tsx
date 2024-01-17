import React from "react";

interface IconProps {
  width: number;
  height: number;
  classes: string;
}

const deleteIcon = ({ width, height, classes = "bg-dark-3" }: IconProps) => {
  return <img src="/assets/icons/delete.svg" width={width} height={height} className={classes}></img>;
};

export default deleteIcon;
