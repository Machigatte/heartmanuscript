import { DRAFT_ID } from "@/constants/note";
import { useAppStore } from "@/stores/use-app-store";
import { Note } from "@/types";
import _ from "lodash";
import { useCallback, useReducer, useMemo, useRef, useEffect } from "react";

type State = {
  currentNote: Note;
  originalNote: Note;
};

type Action =
  | { type: "INIT"; note: Note }
  | { type: "UPDATE_FIELD"; key: keyof Note; newValue: unknown }
  | { type: "RESET"; newInitial?: Note | undefined };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT": {
      return {
        currentNote: action.note,
        originalNote: action.note,
      };
    }
    case "UPDATE_FIELD": {
      if (!state.currentNote) return state;

      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          [action.key]: action.newValue,
        },
      };
    }
    case "RESET":
      return {
        ...state,
        currentNote: state.originalNote,
      };
    default:
      return state;
  }
}

export function useEditor(
  note: Note,
) {
  const [state, dispatch] = useReducer(reducer, {
    currentNote: note,
    originalNote: note,
  });

  // 派生状态
  const { setDirty } = useAppStore();

  const isDirty = useMemo(() => {
    return !_.isEqual(state.currentNote, state.originalNote);
  }, [state.currentNote, state.originalNote]);

  useEffect(() => {
    setDirty(isDirty);
  }, [isDirty, setDirty]);

  const isDraft = useMemo(() => {
    return state.currentNote?.id === DRAFT_ID;
  }, [state.currentNote]);

  const isArchived = useMemo(() => {
    return !!state.currentNote?.archivedAt;
  }, [state.currentNote]);

  // 上次状态
  const prevDirtyRef = useRef(isDirty);

  // 外部回调 onDirtyChange
  useEffect(() => {
    if (prevDirtyRef.current !== isDirty) {
      prevDirtyRef.current = isDirty;
    }
  }, [isDirty]);

  // 外部 note 更新 → 初次加载 / 父组件刷新数据时调用
  const init = useCallback(
    (newNote: Note) => {
      dispatch({ type: "INIT", note: newNote });
    },
    []
  );

  const updateField = useCallback(<K extends keyof Note>(key: K, newValue: Note[K]) => {
    dispatch({ type: "UPDATE_FIELD", key, newValue });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  useEffect(() => {
    init(note);
  }, [note, init]);

  return {
    currentNote: state.currentNote,
    isDirty,
    isDraft,
    isArchived,
    updateField,
    reset,
  };
}
