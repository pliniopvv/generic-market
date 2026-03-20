import { Component } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface ProductFormState {
  name: string;
  description: string;
  fileImage: File | null;
  price: number;
  visible: boolean;
}

export default class FormProduct extends Component<{}, ProductFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      description: "",
      fileImage: null,
      price: 0,
      visible: true,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    this.setState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ fileImage: e.target.files[0] });
    }
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("price", String(this.state.price));
    formData.append("visible", String(this.state.visible));
    if (this.state.fileImage) {
      formData.append("fileImage", this.state.fileImage);
    }

    try {
      const response = await axios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Produto salvo:", response.data);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  render() {
    return (
      <div className="max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Formulário de Produto</h2>
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            className="input input-bordered w-full"
            placeholder="Digite o nome do produto"
            required
          />

          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Digite a descrição"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={this.handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            className="input input-bordered w-full"
            placeholder="0.00"
            step="0.01"
            required
          />

          <label className="cursor-pointer label">
            <span className="label-text">Visível</span>
            <input
              type="checkbox"
              name="visible"
              checked={this.state.visible}
              onChange={this.handleChange}
              className="checkbox checkbox-primary"
            />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Salvar Produto
          </button>
        </form>
      </div>
    );
  }
}
