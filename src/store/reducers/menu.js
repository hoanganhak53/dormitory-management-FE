// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    snackBar: {
        status: 'success',
        message: 'This is the message',
        open: false
    },
    search: ''
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },

        openSnackBar(state, action) {
            state.snackBar = { open: true, message: action.payload.message, status: action.payload.status };
        },

        closeSnackBar(state) {
            state.snackBar.open = false;
        },

        searching(state, action) {
            state.search = action.payload.search;
        }
    }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, openSnackBar, closeSnackBar, searching } = menu.actions;
