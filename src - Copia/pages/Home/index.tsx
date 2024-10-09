import { useState } from "react";

import styles from "./styles.module.css";
import Header from "../../components/Header";
import { Contact } from "../../models/Contact";
import ContactCard from "../../components/ContactCard";

const Home = () => {
    /** 
     * State (estado do componente)
     * Stateful component -> É um componente que manipula dados em seu state
     * Stateless component -> É um componente que não manipula dados em seu state 
    */

    //useState -> hook do React para criar uma nova propriedade dentro do state
    const [name, setName] = useState("");   //inferência -> "name" é declarado "automaticamente" como uma constante string
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    //Utiliza um generic para tipar o array
    const [contacts, setContacts] = useState<Contact[]>([]);

    const saveContact = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const contact = new Contact(name, phone, email);
        contact.address = address || undefined;
        contact.birthday = birthday ? new Date(birthday) : undefined;   //operador ternário
        //Utilizando o spred operator (operador de espalhamento)
        setContacts([contact, ...contacts])

        //para esvaziar os valores dos campos
        setName("");
        setPhone("");
        setEmail("");
        setBirthday("");

    };

    //o "chuchu" pode ser qualquer coisa no TS
    return (
        <div>
            <Header title="Início" />
            <form className={styles.contactForm} onSubmit={saveContact}>
                <label htmlFor="name">Nome*:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={name}
                    required
                    onInvalid={(chuchu) => {
                        chuchu.currentTarget.setCustomValidity("O nome deve ser preenchido")
                    }}
                    onChange={(chuchu) => {
                            setName(chuchu.target.value);
                            chuchu.currentTarget.setCustomValidity("");
                    }}
            />

            <label htmlFor="phone">Telefone*:</label>
            <input 
                type="tel" 
                name="phone" 
                value={phone}
                required 
                onInvalid={(chuchu) => {
                    chuchu.currentTarget.setCustomValidity("O telefone deve ser preenchido")
                }}
                onChange={(chuchu) => {
                    setPhone(chuchu.target.value);
                    chuchu.currentTarget.setCustomValidity("");
                }} 
            />

            <label htmlFor="email">E-mail*:</label>
            <input 
                type="email" 
                name="email" 
                value={email}
                required
                onChange={(chuchu) => setEmail(chuchu.target.value)}
            />

            <label htmlFor="address">Endereço:</label>
            <input 
                type="text" 
                name="address" 
                value={address}
                onChange={(chuchu) => setAddress(chuchu.target.value)}
            />

            <label htmlFor="birthday">Data de nascimento:</label>
            <input 
                type="date" 
                name="birthday" 
                value={birthday}
                onChange={(chuchu) => setBirthday(chuchu.target.value)}
            />

            <input type="submit" value="Salvar" />
            </form>

            {contacts.length > 0 && (
                <div className={styles.contacts}>
                    {contacts.map((chuchu, index) => (
                        <ContactCard key={index} contact={chuchu} />
                    ))}
                </div>
            )}
        </div>
    )
};

export default Home;