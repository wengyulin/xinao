import { Dispatch } from "react";
import { Dict, DictClassify } from "./mode";

export interface DictContextInterface {
  dispatch: Dispatch<Action>;
  state: DictState;
  getDictClassifyList: Function;
  getDictDetail: Function
}

export enum DictAction {
  SET_CLASSIFY_LIST = 'SET_CLASSIFY_LIST',
  SET_CLASSIFY_FORM = 'SET_CLASSIFY_FORM',
  SET_CLASSIFY_MODAL = 'SET_CLASSIFY_MODAL',
  SET_CLASSIFY_SELECTED = 'SET_CLASSIFY_SELECTED',
  SET_DICT_FORM = 'SET_DICT_FORM',
  SET_DICT_MODAL = 'SET_DICT_MODAL',
  SET_DICT_FILTER = 'SET_DICT_FILTER',
  SET_DICT_LIST = 'SET_DICT_LIST'
}

export type Action = { type: DictAction.SET_CLASSIFY_FORM, payload: DictClassify }
  | { type: DictAction.SET_CLASSIFY_MODAL, payload: ModalStatus }
  | { type: DictAction.SET_DICT_FORM, payload: Dict }
  | { type: DictAction.SET_CLASSIFY_SELECTED, payload: DictClassify }
  | { type: DictAction.SET_DICT_MODAL, payload: ModalStatus }
  | { type: DictAction.SET_DICT_FILTER, payload: DictFilter }
  | { type: DictAction.SET_CLASSIFY_LIST, payload: Array<DictClassify> }
  | { type: DictAction.SET_DICT_LIST, payload: Array<Dict> }

export interface ModalStatus {
  visible: boolean;
  isEdit: boolean;
}

export interface DictFilter {
  pageNum: number;
  pageSize: number;
  total: number;
  parentCode?: string;
}

export interface DictState {
  classifyForm: DictClassify;
  classifyModal: ModalStatus;
  classifyList: Array<DictClassify>;
  classifySelected: DictClassify;
  dictModal: ModalStatus;
  dictForm: Dict;
  dictFilter: DictFilter;
  dictList: Array<Dict>;
}

export type classifyClickType = 'add' | 'edit' | 'delete';
export type dictDetailClickType = 'add' | 'edit' | 'delete';
