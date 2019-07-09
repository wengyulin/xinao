export interface DictClassify {
  dictId?: number;
  dictCode?: string;
  dictName?: string;
  remark?: string;
}

export interface Dict {
  dictId?: number;
  dictCode?: string;
  dictName?: string;
  displayIndex?: number;
  status?: number;
  remark?: string;
  parentCode?: string;
}
