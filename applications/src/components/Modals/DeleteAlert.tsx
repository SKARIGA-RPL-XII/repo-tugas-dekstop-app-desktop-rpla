import trashIcon from "../../assets/trash.png";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../UI/AlertDialog";
import { Button } from "../UI/Button";

interface DeleteAlertProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  open,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <AlertDialog className="bg-transparent" open={open} onOpenChange={onCancel}>
      <AlertDialogContent className="flex flex-col justify-center w-[400px] bg-white rounded-3xl">
        <div className="-mt-20 mx-auto mb-6 w-72 h-72 flex items-center justify-center">
          <img src={trashIcon} alt="Hapus" className="w-64 h-64 object-contain" />
        </div>

        <AlertDialogHeader className="text-center -mt-20 mb-4 bg-transparent border-none">
          <AlertDialogTitle className="text-xl font-semibold text-gray-900">
            Hapus Data
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500 leading-relaxed mt-2">
            Data yang Anda pilih akan dihapus
            secara permanen dan tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="w-36 bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Batalkan
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-36 bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
