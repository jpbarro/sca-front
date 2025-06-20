import axios from 'axios';
import { SpyCat } from '@/types';
import { AddCatFormValues, EditSalaryFormValues } from './validators';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all spy cats from the backend.
 * @returns A promise that resolves to an array of SpyCat objects.
 */
export const getAllCats = async (): Promise<SpyCat[]> => {
  try {
    console.log('Making API call to:', api.defaults.baseURL + 'cats/');
    const response = await api.get('cats/');
    console.log('API Response status:', response.status);
    console.log('API Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cats:', error);
    throw new Error('Could not retrieve spy cat agents.');
  }
};

/**
 * Adds a new spy cat to the database.
 * @param catData - The data for the new cat, validated by Zod.
 * @returns A promise that resolves to the newly created SpyCat object.
 */
export const addCat = async (catData: AddCatFormValues): Promise<SpyCat> => {
  try {
    const response = await api.post('cats/', catData);
    return response.data;
  } catch (error) {
    console.error('Failed to add cat:', error);
    throw new Error('Could not add new spy cat agent.');
  }
};

/**
 * Updates the salary of a specific spy cat.
 * @param catId - The ID of the cat to update.
 * @param salaryData - The new salary data, validated by Zod.
 * @returns A promise that resolves to the updated SpyCat object.
 */
export const updateCatSalary = async (catId: number, salaryData: EditSalaryFormValues): Promise<SpyCat> => {
  try {
    const response = await api.patch(`cats/${catId}`, salaryData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update salary for cat ${catId}:`, error);
    throw new Error('Could not update agent salary.');
  }
};

/**
 * Deletes a spy cat from the database.
 * @param catId - The ID of the cat to delete.
 * @returns A promise that resolves when the operation is complete.
 */
export const deleteCat = async (catId: number): Promise<void> => {
  try {
    await api.delete(`cats/${catId}`);
  } catch (error) {
    console.error(`Failed to delete cat ${catId}:`, error);
    throw new Error('Could not dismiss spy cat agent.');
  }
};