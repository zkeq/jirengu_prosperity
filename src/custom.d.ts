type RecordItem = {
  amount: number;
  type: string;
  notes: string;
  tags: string[]; // 数据类型  object | string
  createAt?: string; // 类 / 构造函数
};

interface Window {
  tagList: Tag[];
  createTag: (name:string) => void;
  recordList: RecordItem[];
}

type Tag = {
  id: string;
  name: string;
}

type TagLisModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => "success" | "duplicated"
  update: (id: string, name: string) => "success" | "not found" | "duplicated"
  remove: (id: string) => "success" | "not found"
  save: () => void
  createDefaultTagList: () => Tag[]
}
