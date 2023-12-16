import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharactersState {
    characters: string[];
    selectedRole :string;
}

const initialState: CharactersState = {
    characters: [],
    selectedRole:""
};

export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<string[]>) => {
            state.characters = action.payload;
        },
        addCharacter: (state, action: PayloadAction<string>) => {
            state.characters.push(action.payload);
        },
        removeCharacter: (state, action: PayloadAction<string>) => {
            state.characters = state.characters.filter(character => character !== action.payload);
        },
        resetCharacters: (state) => {
            state.characters = [];
        },
        setRole: (state, action: PayloadAction<string>) =>{
            state.selectedRole = action.payload;
        }
    },
});

export const { setCharacters, addCharacter, removeCharacter, resetCharacters,setRole } = charactersSlice.actions;
export default charactersSlice.reducer;
