import React from "react";

const Modal = ({
  title,
  children,
  isVisible,
  onClose,
  className,
}: {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onClose: Function;
  className?: string;
}) => {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center"
      id="wrapper"
      onMouseDown={handleClose}
    >
      <div className={"bg-white p-4 rounded-lg border " + className ?? ""}>
        <h1 className="text-center text-2xl font-bold">{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
