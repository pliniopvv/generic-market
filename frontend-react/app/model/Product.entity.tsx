import { BASE_API } from "~/environment";
import GenericEntity from "~/service/GenericEntity";

export default class ProductEntity extends GenericEntity {
  name: string;
  description: string;
  urlImage: string;
  price: number;
  visible: boolean;

  constructor() {
    super({
      url: `${BASE_API}/product`,
    });
  }
}
