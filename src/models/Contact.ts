export class Contact {
    //inicia como uma string vazia para tirar o erro
    name: string = "";
    phone: string = "";
    email: string = "";
    address?: string;
    birthday?: Date;

    constructor(name: string, phone: string, email: string) {
        /*
        this.name = name;
        this.phone = phone;
        this.email = email;
        */
       Object.assign(this, { name, phone, email});
    }
}