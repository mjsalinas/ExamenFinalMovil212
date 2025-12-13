import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subject, } from '../services/dummyData';


export interface SubjectsState {
    subjects: Subject[]
}

const initialState: SubjectsState = {
    subjects: [],
}

const SubjectsSlice = createSlice({
    name: "subjects",
    initialState,
    reducers:{
        addSubjects: (state, action: PayloadAction<SubjectsState>) => {
            state.subjects = action.payload.subjects
        },
        addSubject: (state, action: PayloadAction<Subject>) => {
            state.subjects.push(action.payload)
        }  
    }
})

export const {addSubjects, addSubject} = SubjectsSlice.actions;
export default SubjectsSlice.reducer