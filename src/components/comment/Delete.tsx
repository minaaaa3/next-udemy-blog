import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteComment } from "@/lib/actions/deleteComment";

type DeleteCommentProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  commentId: string;
};
export default function DeleteCommentDialog({
  postId,
  isOpen,
  onOpenChange,
  commentId,
}: DeleteCommentProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>コメントの削除</AlertDialogTitle>
          <AlertDialogDescription>
            この記事を削除してもよろしいですか？
            <br />
            この操作は取り消せません
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteComment(commentId, postId)}
            className="bg-red-500 hover:bg-red-600"
          >
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
