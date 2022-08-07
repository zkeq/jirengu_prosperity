const localStorageKeyName = 'tagList';

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
}

const tagListModel:TagLisModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name: string) {
        const names = this.data.map(item => item.name);
        if(names.indexOf(name)>=0){ return "duplicated" }
        this.data.push({id: name, name:name});
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