import { create } from 'apisauce';

export const apiClient = create({
  baseURL: 'https://recruitment-test.flip.id',
  headers: { 'Content-Type': 'application/json' },
});
