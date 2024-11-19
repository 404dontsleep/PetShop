import axiosInstance from "@/api/AxiosInstance";
import { useEffect } from "react";
import { Portal, Snackbar } from "react-native-paper";
import { create } from "zustand";

interface IErrorStore {
  error: string;
  setError: (error: string) => void;
}

const useGlobalErrorStore = create<IErrorStore>((set) => ({
  error: "",
  setError: (error: string) => set({ error }),
}));
export default function GlobalError() {
  const { error, setError } = useGlobalErrorStore();
  //   const { setError } = useGlobalErrorStore();
  //   useEffect(() => {
  //     const handleError = (error: any) => {
  //       if (error?.response?.data?.message) setError(error.response.data.message);
  //     };
  //     const id = axiosInstance.interceptors.response.use(undefined, handleError);
  //     return () => {
  //       axiosInstance.interceptors.response.eject(id);
  //     };
  //   }, []);
  return (
    <Portal>
      <Snackbar
        visible={error !== ""}
        onDismiss={() => {
          setError("");
        }}
        duration={500}
      >
        {error}
      </Snackbar>
    </Portal>
  );
}
export { useGlobalErrorStore };
