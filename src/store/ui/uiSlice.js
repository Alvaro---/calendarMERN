import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModelOpen: false
    },
    reducers: {
        onOpenDatemodal: (state, /* action */) => {
            state.isDateModelOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModelOpen = false
        }
    }
});

export const { onOpenDatemodal, onCloseDateModal } = uiSlice.actions;
