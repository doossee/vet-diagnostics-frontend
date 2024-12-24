import { createStore } from 'zustand'

export const useAppStore = createStore((set) => ({
    nawOpen: false,
    setNavOpen: (payload: boolean) => set(() => ({nawOpen: payload}))
}))