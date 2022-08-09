import createID from "@/lib/createID";

const localStorageKeyName = 'tagList';

const tagListModel: TagLisModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    createDefaultTagList() {
        const tagList = [
            "衣服",
            "食物",
            "住房",
            "交通",
        ]
        tagList.forEach(tag => {
            this.create(tag)
        })
        return this.data;
    },
    create(name: string) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) { return "duplicated" }
        const id = createID();
        this.data.push({ id, name: name });
        this.save();
        return "success";
    },
    update(id: string, name: string) {
        const idx = this.data.findIndex(item => item.id === id);
        if (idx === -1) {
            return "not found";
        }
        if (this.data.find(item => item.name === name)) {
            return "duplicated";
        }
        this.data[idx].name = name;
        this.save();
        return "success";
    },
    remove(id: string) {
        const idx = this.data.findIndex(item => item.id === id);
        if (idx === -1) {
            return "not found";
        }
        this.data.splice(idx, 1);
        this.save();
        return "success";
    }
}

export { tagListModel };