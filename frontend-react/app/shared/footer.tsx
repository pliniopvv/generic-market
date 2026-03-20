import { Component } from "react";

export default class FooterComponent extends Component {
  render() {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-lg font-bold">Generic-Market</h1>
            <p className="text-sm text-gray-400">
              © 2026 Todos os direitos reservados
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300">
              Sobre
            </a>
            <a href="#" className="hover:text-gray-300">
              Serviços
            </a>
            <a href="#" className="hover:text-gray-300">
              Contato
            </a>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400">
              Twitter
            </a>
            <a href="#" className="hover:text-pink-400">
              Instagram
            </a>
            <a href="#" className="hover:text-blue-600">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
