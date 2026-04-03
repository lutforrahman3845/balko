"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  HiCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import type { ReactNode } from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";

type StatusType = "info" | "success" | "warning" | "danger";

interface ConfirmDialogProps extends DialogProps {
  isOpen: boolean;
  onClose: () => void;
  cancelText?: ReactNode | string;
  confirmText?: ReactNode | string;
  confirmButtonProps?: {
    loading?: boolean;
    onClick?: () => void;
  };
  cancelButtonProps?: {
    loading?: boolean;
    onClick?: () => void;
  };
  type?: StatusType;
  confirmButtonType?:
  | "default"
  | "link"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null
  | undefined;
  title?: ReactNode | string;
  onCancel?: () => void;
  onConfirm?: () => void;
  loading?: boolean;
}

const StatusIcon = ({ status }: { status: StatusType }) => {
  switch (status) {
    case "info":
      return (
        <Avatar className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 mx-auto">
          <HiOutlineInformationCircle className="h-6 w-6 m-auto" />
        </Avatar>
      );
    case "success":
      return (
        <Avatar className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100">
          <HiCheckCircle className="h-6 w-6 m-auto" />
        </Avatar>
      );
    case "warning":
      return (
        <Avatar className="bg-amber-100 text-amber-600 dark:text-amber-100">
          <HiOutlineExclamationCircle className="h-6 w-6 m-auto" />
        </Avatar>
      );
    case "danger":
      return (
        <Avatar className="bg-red-100 text-red-600 dark:text-red-100">
          <HiOutlineExclamation className="h-6 w-6 m-auto" />
        </Avatar>
      );
    default:
      return null;
  }
};

const ConfirmDialog = ({
  type = "info",
  title,
  children,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  confirmButtonType = "default",
  confirmButtonProps,
  cancelButtonProps,
  isOpen,
  onClose,
  loading = false,
}: ConfirmDialogProps) => {
  const defaultCancelText = cancelText ?? "Cancel";
  const defaultConfirmText = confirmText ?? "Confirm";
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-50 max-w-md rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-left mb-4">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-4">
          <StatusIcon status={type} />
          <div>
            <DialogDescription>{children}</DialogDescription>
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="shadow-none"
            onClick={onCancel}
            {...cancelButtonProps}
          >
            {defaultCancelText}
          </Button>
          <Button
            size="sm"
            variant={confirmButtonType}
            onClick={onConfirm}
            {...confirmButtonProps}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : defaultConfirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
