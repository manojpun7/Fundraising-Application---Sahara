import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  topDonors: [],
  totalAmount: 0, 
  isLoading: false,
  error: null,

  fetchTopDonors: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.get("https://fundraising-application-sahara.onrender.com/app/fund/fetch");
      const data = res.data?.data || [];

      let sumTotal = 0;
      const donorMap = {};
      
      data.forEach((donor) => {
        const amount = parseFloat(donor.total_amount) || 0;
        sumTotal += amount; 
        
        donorMap[donor.fullName] = (donorMap[donor.fullName] || 0) + amount;
      });

      const sorted = Object.entries(donorMap)
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total);

      set({ 
        topDonors: sorted, 
        totalAmount: sumTotal, 
        isLoading: false 
      });

    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("Failed to fetch donors:", error);
    }
  },
}));

export default useStore;