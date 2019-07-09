import { stringify } from "qs";

import { fetch } from "../../utils";
import { Dict, DictClassify } from "./mode";
import { DictFilter } from "./types";

export const getDictClassify = () => {
  return fetch('/dictionaries/type')
};

export const addDictClassify = (body: DictClassify) => {
  return fetch.post('/dictionaries/type', body);
};

export const updateDictClassify = (body: DictClassify) => {
  return fetch.put('/dictionaries/type', body);
};

export const deleteDictClassify = (dictId?: number) => {
  return fetch.delete(`/dictionaries/type?${stringify({dictId})}`)
};

export const getDict = (filter: DictFilter) => {
  return fetch(`/dictionaries/all/page?${stringify(filter)}`)
};

export const addDict = (body: Dict) => {
  return fetch.post('/dictionaries', body)
};

export const updateDict = (body: Dict) => {
  return fetch.put('/dictionaries', body)
};

export const deleteDict = (dictId?: number) => {
  return fetch.delete(`/dictionaries?${stringify({dictId})}`)
};
