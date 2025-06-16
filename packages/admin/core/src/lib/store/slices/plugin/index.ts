import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PluginDefinition } from "../../../factories/pluginFactory";

export type PluginState = {
    plugins: PluginDefinition[]
}

const initialState: PluginState = {
    plugins: []
}

export const pluginSlice = createSlice({
    name: 'plugin',
    initialState,
    reducers: {
        setPlugins: (state: PluginState, action: PayloadAction<PluginDefinition[]>) => {
            state.plugins = action.payload;
        },
        resetPluginState: () => initialState
    }
})

export const { setPlugins, resetPluginState } = pluginSlice.actions;
export default pluginSlice.reducer;