interface IconProps {
  width: number;
  height: number;
  classes?: string;
}

const DeleteIcon = ({ width, height, classes = "bg-dark-3" }: IconProps) => {
  return <img src="/assets/icons/delete.svg" width={width} height={height} className={classes} alt="delete"></img>;
};

export default DeleteIcon;
