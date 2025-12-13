import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus } from "../services/dummyData";

export type StatusFilter = "all" | 'pending' | 'inProgress' |'completed';
export type SubjectFilter = string | "all";

export interface FiltersState {
  statusFilter: StatusFilter;
  subjectFilter: SubjectFilter;
}

const initialState: FiltersState = {
  statusFilter: "all",
  subjectFilter: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusFilter>) => {
      state.statusFilter = action.payload;
    },
    setSubjectFilter: (state, action: PayloadAction<SubjectFilter>) => {
      state.subjectFilter = action.payload;
    },
  },
});

export const { setStatus, setSubjectFilter } = filterSlice.actions;
export default filterSlice.reducer;