import React, { FC, useState, FormEvent } from 'react';
import { ZodError } from 'zod';
import { addCatSchema } from '@/lib/validators';
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
import { PlusCircle } from 'lucide-react';
import { addCat } from '@/lib/api';


interface AddCatFormProps {
  onCatAdded: () => void;
  children?: React.ReactNode;
}

export const AddCatForm: FC<AddCatFormProps> = ({ onCatAdded, children }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    years_of_experience: '',
    salary: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = addCatSchema.parse(formData);
      
      await addCat(validatedData);

      onCatAdded();
      setOpen(false);
      setFormData({ name: '', breed: '', years_of_experience: '', salary: '' });
    
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach(issue => {
          const path = issue.path[0] as string;
          formattedErrors[path] = issue.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error("An API error occurred:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : (
          <Button>
             <PlusCircle />
             Add New Agent
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Spy Agent</DialogTitle>
            <DialogDescription>
              Fill in the details for the new recruit. Click &quot;Add Agent&quot; when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'border-red-500' : ''}/>
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-slate-700 mb-1">Years of Exp.</label>
              <Input id="yearsOfExperience" name="years_of_experience" type="number" value={formData.years_of_experience} onChange={handleInputChange} className={errors.years_of_experience ? 'border-red-500' : ''}/>
              {errors.years_of_experience && <p className="text-sm text-red-600 mt-1">{errors.years_of_experience}</p>}
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-slate-700 mb-1">Breed</label>
              <Input id="breed" name="breed" value={formData.breed} onChange={handleInputChange} className={errors.breed ? 'border-red-500' : ''} />
              {errors.breed && <p className="text-sm text-red-600 mt-1">{errors.breed}</p>}
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
              <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleInputChange} className={errors.salary ? 'border-red-500' : ''} />
              {errors.salary && <p className="text-sm text-red-600 mt-1">{errors.salary}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting} >Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} >{isSubmitting ? 'Adding...' : 'Add Agent'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};