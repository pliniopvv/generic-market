import axios from "axios";
import type Filter from "~/model/Filter";

export default class GenericEntity {
  id: number;
  private url: string;

  constructor(cmp: any) {
    Object.assign(this, cmp);
    if (!this.url) throw new Error("url required");
  }

  async list(filter?: Filter) {
    if (!filter) {
      const { status, data } = await axios.get(`${this.url}`);
      if (200 > status || status > 299) throw new Error(`status ${status}`);
      return data.map((e) => new GenericEntity({ url: this.url, ...e }));
    }

    const { status, data } = await axios.get(
      `${this.url}?page=${filter.page}&size=${filter.pageSize}`,
    );
    if (200 > status || status > 299) throw new Error(`status ${status}`);
    const list = data.data;
    data.data = undefined;
    return list.map((e) => new GenericEntity({ url: this.url, _: data, ...e }));
  }

  async load() {
    const { status, data } = await axios.get(`${this.url}`);
    if (200 > status || status > 299) throw new Error(`status ${status}`);
    Object.assign(this, data);
    return this;
  }
  async save() {
    const { status, data } = await axios.post(`${this.url}`, this);
    if (200 > status || status > 299) throw new Error(`status ${status}`);
    Object.assign(this, data);
    return this;
  }
  async update() {
    const { status, data } = await axios.put(`${this.url}/${this.id}`, this);
    if (200 > status || status > 299) throw new Error(`status ${status}`);
    Object.assign(this, data);
    return this;
  }
  async delete() {
    const { status, data } = await axios.delete(`${this.url}/${this.id}`);
    if (200 > status || status > 299) throw new Error(`status ${status}`);
    Object.assign(this, data);
    return this;
  }
}
