import React, { FC } from 'react';
import { SpyCat } from '@/types';
import { DeleteCatDialog } from './DeleteCatDialog';
import { EditSalaryForm } from './EditSalaryForm';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';



interface SpyCatTableRowProps {
  cat: SpyCat;
  onSalaryUpdated: () => void;
  onCatDeleted: () => void;
}

export const SpyCatTableRow: FC<SpyCatTableRowProps> = ({ cat, onSalaryUpdated, onCatDeleted }) => {
  return (
    <tr className="border-b hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{cat.name}</td>
      <td className="px-6 py-4 text-slate-600">{cat.years_of_experience}</td>
      <td className="px-6 py-4 text-slate-600">{cat.breed}</td>
      <td className="px-6 py-4 text-slate-600">${cat.salary.toLocaleString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end space-x-2">
          <EditSalaryForm cat={cat} onSalaryUpdated={onSalaryUpdated}>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-1"/> Edit
            </Button>
          </EditSalaryForm>
          <DeleteCatDialog cat={cat} onCatDeleted={onCatDeleted}>
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4 mr-1"/> Delete
            </Button>
          </DeleteCatDialog>
        </div>
      </td>
    </tr>
  );
};