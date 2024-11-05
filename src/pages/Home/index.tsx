import { useContext, useEffect, useState } from "react";

import Header from "../../components/Header";
import { Contact } from "../../models/Contact";
import { ContactService } from "../../services/ContactService";
import { UserContext } from "../../context/UserContext";
import ContactCard from "../../components/ContactCard";
import { Hourglass } from "react-loader-spinner";

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, isLoading] = useState(false);

  const { email } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const service = new ContactService();
      const results = await service.findAllByOwner(email);
      setContacts(results);
      isLoading(false);
    })();
  },[]);

  return (
    <>
      <Header title="Início" />

      <Hourglass
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        visible={loading}
      />

      {!loading && contacts.length > 0 && (
        <>
          <h1>Seus contatos</h1>

          {contacts.map((c) => (
            <ContactCard key={c.email} contact={c} />
          ))}
        </>
      )}

      {!loading && contacts.length === 0 && <p>Nenhum contato cadastrado</p>}
    </>
  );
};

export default Home;
