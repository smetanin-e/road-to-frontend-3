import { Api } from '@/shared/services';
import { Tag } from '@prisma/client';
import { create } from 'zustand';

interface TagsState {
  loading: boolean;
  error: boolean;
  tags: Tag[];
  getTags: () => Promise<void>;
}

export const useTagsStore = create<TagsState>()((set) => ({
  loading: true,
  error: false,
  tags: [],
  getTags: async () => {
    try {
      const dataTags = await Api.tags.getTags();
      set({ tags: dataTags });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
