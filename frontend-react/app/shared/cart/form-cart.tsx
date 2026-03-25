import { useState } from "react";

export default function FormCart({ onClose }) {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do pagamento:", formData);
    // Aqui você chamaria o gateway AbacatePay com os dados coletados
  };

  return (
    <div className="flex justify-content items-center">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 shadow-xl p-6 max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">Informações de Pagamento</h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nome no cartão</span>
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Ex: Plínio Silva"
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Número do cartão</span>
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="0000 0000 0000 0000"
            required
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Validade</span>
            </label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="MM/AA"
              required
            />
          </div>

          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">CVV</span>
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="123"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={() => onClose(formData)}
        >
          Pagar
        </button>
      </form>
      <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">
        {/* content */}
        <div className="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
          <div className="card-body">
            <div className="flex justify-between mb-10">
              <div className="font-bold">Cartão de Crédito</div>
              <div className="text-5xl opacity-10">❁</div>
            </div>
            <div className="text-lg mb-4 opacity-40">{formData.cardNumber}</div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs opacity-20">NOME</div>
                <div>{formData.cardName}</div>
              </div>
              <div>
                <div className="text-xs opacity-20">VALIDADE</div>
                <div>{formData.expiry}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </a>
    </div>
  );
}
