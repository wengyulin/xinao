import React, { createContext, useEffect, useReducer } from 'react';

import { Action, DictAction, DictContextInterface, DictFilter, DictState } from "./types";
import { getDict, getDictClassify } from "./service";

const initState: DictState = {
  classifyList: [],
  classifyForm: {},
  classifyModal: {
    visible: false,
    isEdit: false,
  },
  classifySelected: {},
  dictForm: {},
  dictModal: {
    visible: false,
    isEdit: false
  },
  dictList: [],
  dictFilter: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    parentCode: ''
  }
};

const reducers = (state: DictState, action: Action): DictState => {
  switch (action.type) {
    case DictAction.SET_CLASSIFY_LIST:
      return {...state, classifyList: action.payload};
    case DictAction.SET_CLASSIFY_FORM:
      return {...state, classifyForm: action.payload};
    case DictAction.SET_CLASSIFY_MODAL:
      return {...state, classifyModal: action.payload};
    case DictAction.SET_CLASSIFY_SELECTED:
      return {...state, classifySelected: action.payload};
    case DictAction.SET_DICT_FORM:
      return {...state, dictForm: action.payload};
    case DictAction.SET_DICT_MODAL:
      return {...state, dictModal: action.payload};
    case DictAction.SET_DICT_FILTER:
      return {...state, dictFilter: action.payload};
    case DictAction.SET_DICT_LIST:
      return {...state, dictList: action.payload};
    default:
      return state;
  }
};

const DictContext = createContext<DictContextInterface>({
  state: initState,
  dispatch: () => {},
  getDictClassifyList: () => {},
  getDictDetail: () => {}
});

const DictProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducers, initState);

  useEffect(() => {
    getDictClassifyList(true);
  }, []);

  useEffect(() => {
    if (state.classifySelected && state.classifySelected.dictId) {
      getDictDetail();
    }
  }, [state.classifySelected]);

  const getDictClassifyList = (isInit = false) => {
    getDictClassify().then((res: any) => {
      dispatch({
        type: DictAction.SET_CLASSIFY_LIST,
        payload: res.result
      });
      if (isInit) {
        dispatch({
          type: DictAction.SET_CLASSIFY_SELECTED,
          payload: res.result[0]
        });
      }
    })
  };

  const getDictDetail = (filter: DictFilter = state.dictFilter) => {
    getDict({...filter, parentCode: state.classifySelected.dictCode}).then((res: any) => {
      dispatch({
        type: DictAction.SET_DICT_LIST,
        payload: res.result.list
      });
      dispatch({
        type: DictAction.SET_DICT_FILTER,
        payload: {
          ...state.dictFilter,
          pageNum: res.result.pageNum,
          pageSize: res.result.pageSize,
          total: res.result.total
        }
      })
    })
  };

  return (
    <DictContext.Provider value={{state, dispatch, getDictClassifyList, getDictDetail}}>
      {children}
    </DictContext.Provider>
  )
};


export { DictProvider, DictContext };
