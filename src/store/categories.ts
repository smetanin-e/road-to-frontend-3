import { Api } from '@/shared/services';
import { CatalogDTO } from '@/shared/services/dto/catalog.dto';
import { create } from 'zustand';

interface CategoriesState {
  categories: CatalogDTO[];
  loading: boolean;
  error: boolean;
  getAllCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>()((set) => ({
  categories: [],
  loading: true,
  error: false,
  getAllCategories: async () => {
    try {
      const dataCategories = await Api.categories.getCategories();
      set({ categories: dataCategories });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
