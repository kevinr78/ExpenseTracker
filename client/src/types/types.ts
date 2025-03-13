import { SetStateAction } from "react";

export type ModalProps = {
  modalAction: React.Dispatch<SetStateAction<string>>;
};

export type NavBarProps = {
  type: string;
  action: React.Dispatch<SetStateAction<string>>;
};
