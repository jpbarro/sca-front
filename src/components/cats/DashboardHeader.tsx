import React, { FC } from 'react';
import { AddCatForm } from './AddCatForm';

interface DashboardHeaderProps {
  onCatAdded: () => void;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ onCatAdded }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Spy Cats Agency</h1>
        <p className="text-slate-500">Agent Management Dashboard</p>
      </div>
      <AddCatForm onCatAdded={onCatAdded} />
    </div>
  );
};