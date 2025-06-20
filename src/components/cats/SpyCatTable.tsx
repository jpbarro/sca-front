import { SpyCatTableRow } from './SpyCatTableRow';
import { SpyCat } from '@/types';
import { FC } from 'react';

interface SpyCatTableProps {
  cats: SpyCat[];
  isLoading: boolean;
  onCatDeleted: () => void;
  onSalaryUpdated: () => void;
}

export const SpyCatTable: FC<SpyCatTableProps> = ({ cats, isLoading, onCatDeleted, onSalaryUpdated }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm mt-6">
       <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-600">Name</th>
                <th className="px-6 py-3 font-medium text-slate-600">Years of Exp.</th>
                <th className="px-6 py-3 font-medium text-slate-600">Breed</th>
                <th className="px-6 py-3 font-medium text-slate-600">Salary</th>
                <th className="px-6 py-3 font-medium text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">Loading agents...</td>
                </tr>
              ) : cats.length > 0 ? (
                cats.map(cat => (
                  <SpyCatTableRow 
                    key={cat.id} 
                    cat={cat}
                    onCatDeleted={onCatDeleted} 
                    onSalaryUpdated={onSalaryUpdated}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">No spy cats found. Time to recruit!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
  );
};