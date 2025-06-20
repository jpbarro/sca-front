'use client';

import React, { useState, useEffect } from 'react';
import { SpyCat } from '@/types'; 
import { DashboardHeader } from '@/components/cats/DashboardHeader';
import { SpyCatTable } from '@/components/cats/SpyCatTable';
import { getAllCats } from '@/lib/api';

export default function SpyCatsPage() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  useEffect(() => {
    setIsLoading(true);
    getAllCats()
      .then((data) => {
        setCats(data);
      })
      .catch((error) => {
        console.error('Error fetching cats:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <DashboardHeader onCatAdded={() => {
          setIsRefreshing(true);
          getAllCats()
            .then((data) => {
              setCats(data);
            })
            .finally(() => {
              setIsRefreshing(false);
            });
        }} />
        <SpyCatTable 
          cats={cats} 
          isLoading={isLoading || isRefreshing} 
          onCatDeleted={() => {
            setIsRefreshing(true);
            getAllCats()
              .then((data) => {
                setCats(data);
              })
              .finally(() => {
                setIsRefreshing(false);
              });
          }}
          onSalaryUpdated={() => {
            setIsRefreshing(true);
            getAllCats()
              .then((data) => {
                setCats(data);
              })
              .finally(() => {
                setIsRefreshing(false);
              });
            }}
        />
      </div>
    </div>
  );
}