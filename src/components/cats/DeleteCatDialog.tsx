import React, { FC, useState } from 'react';
import { SpyCat } from '@/types';
import { deleteCat } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

interface DeleteCatDialogProps {
  cat: SpyCat;
  onCatDeleted?: () => void;
  children: React.ReactNode;
}

export const DeleteCatDialog: FC<DeleteCatDialogProps> = ({ cat, onCatDeleted, children }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(undefined);
    
    try {
      await deleteCat(cat.id);

      if (typeof onCatDeleted === 'function') {
        onCatDeleted();
      } else {
        console.error("DeleteCatDialog Error: The 'onCatDeleted' prop is missing or is not a function.");
      }
      
      setOpen(false);

    } catch (err) {
      console.error("An API error occurred during deletion:", err);
      setError("Failed to dismiss agent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setError(undefined);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Dismissal</DialogTitle>
          <DialogDescription>
            Are you sure you want to dismiss agent <span className="font-semibold text-slate-900">{cat.name}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        {error && <p className="text-sm text-red-600 text-center py-2">{error}</p>}

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting ? 'Dismissing...' : 'Confirm Dismissal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};