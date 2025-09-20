import { useEffect, useState } from "react";

import { ContactList } from "./components/custom/contact";
import { Navbar } from "./components/custom/navbar";
import { SearchBox } from "./components/custom/search-box";
import type { ContactType } from "./types/company";

function App() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [visibleContacts, setVisibleContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchContacts() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        return new Error("Fetch returned with error response");
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error("Fetch contacts failed, ", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setVisibleContacts(
      contacts.sort((ca, cb) => {
        const cau = ca.username.toLowerCase();
        const cbu = cb.username.toLowerCase();
        if (cau < cbu) return -1;
        else if (cau > cbu) return 1;
        else return 0;
      })
    );
  }, [contacts]);

  function handleSearch(query: string) {
    if (!query) {
      setVisibleContacts(contacts);
    }

    setVisibleContacts(
      contacts.filter((contact) =>
        contact.username.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <Navbar />
      <SearchBox onSearch={handleSearch} />
      <ContactList contacts={visibleContacts} loading={loading} />
    </div>
  );
}

export default App;
