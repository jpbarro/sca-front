import React, { FC, useState, FormEvent, useEffect } from 'react';
import { ZodError } from 'zod';
import { editSalarySchema } from '@/lib/validators';
import { updateCatSalary } from '@/lib/api';
import { SpyCat } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface EditSalaryFormProps {
  cat: SpyCat;
  onSalaryUpdated?: () => void;
  children: React.ReactNode;
}

export const EditSalaryForm: FC<EditSalaryFormProps> = ({ cat, onSalaryUpdated, children }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [salary, setSalary] = useState(String(cat.salary));
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (open) {
      setSalary(String(cat.salary));
      setError(undefined);
    }
  }, [open, cat.salary]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setIsSubmitting(true);

    try {
      const validatedData = editSalarySchema.parse({ salary });
      
      await updateCatSalary(cat.id, validatedData);

      if (typeof onSalaryUpdated === 'function') {
        onSalaryUpdated();
      }
      setOpen(false);

    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        console.error("An API error occurred:", err);
        setError("Failed to update salary. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Salary for {cat.name}</DialogTitle>
            <DialogDescription>
              Update the salary for this agent. Click &quot;Save Changes&quot; when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor={`salary-${cat.id}`} className="block text-sm font-medium text-slate-700 mb-1">New Salary</label>
              <Input
                id={`salary-${cat.id}`}
                name="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};