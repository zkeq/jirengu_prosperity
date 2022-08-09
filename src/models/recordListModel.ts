import clone from "@/lib/clone";

const localStorageKeyName = 'recordList';

const recordListModel = {
    data: [] as RecordItem[],
    create(record: RecordItem){
        const recordClone = clone(record);
        recordClone.createAt = recordClone.createAt || (new Date).toISOString();
        this.data.push(recordClone);
    },
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)|| "[]") as RecordItem[];
        return this.data
    },
    save(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
}

export {recordListModel};