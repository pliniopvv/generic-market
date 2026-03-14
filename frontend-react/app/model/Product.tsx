import GenericEntity from "~/service/GenericEntity";

export default class ProductEntity extends GenericEntity {
    constructor() {
        super({
            url: "product"
        });
    }
}