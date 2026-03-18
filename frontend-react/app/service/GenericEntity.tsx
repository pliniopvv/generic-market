import axios from "axios";

export default class GenericEntity {

    id: number;
    private url: string;

    constructor(cmp: any) {
        Object.assign(this, cmp);
        if (!this.url) throw new Error("url required");
    }

    async load() {
        const { status, data } = await axios.get(`${this.url}`);
        if (200 < status || status < 299) throw new Error(`status ${status}`);
        Object.assign(this, data);
        return this;
    }
    async save() {
        const { status, data } = await axios.post(`${this.url}/${this.id}`, this);
        if (200 < status || status < 299) throw new Error(`status ${status}`);
        Object.assign(this, data);
        return this;
    }
    async update() {
        const { status, data } = await axios.put(`${this.url}/${this.id}`, this);
        if (200 < status || status < 299) throw new Error(`status ${status}`);
        Object.assign(this, data);
        return this;
    }
    async delete() {
        const { status, data } = await axios.delete(`${this.url}/${this.id}`);
        if (200 < status || status < 299) throw new Error(`status ${status}`);
        Object.assign(this, data);
        return this;
    }
}