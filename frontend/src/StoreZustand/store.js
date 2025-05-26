import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  topDonors: [],
  isLoading: false,
  error: null,

  fetchTopDonors: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.get("http://localhost:4000/app/fund/fetch");
      const data = res.data?.data || [];

      const donorMap = {};
      data.forEach((donor) => {
        donorMap[donor.fullName] =
          (donorMap[donor.fullName] || 0) + parseFloat(donor.total_amount);
      });

      const sorted = Object.entries(donorMap)
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total);

      set({ topDonors: sorted, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("Failed to fetch donors:", error);
    }
  },
}));

export default useStore;
