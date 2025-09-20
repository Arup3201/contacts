import { useNavigate } from "react-router";
import type { ContactType } from "../../types/company";
import { User } from "lucide-react";

interface ContactListProps {
  contacts: ContactType[];
  loading: boolean;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, loading }) => {
  const navigate = useNavigate();

  function handleClick(contactId: number) {
    navigate(`/contacts/${contactId}`);
  }

  if (loading) {
    return (
      <p className="mt-4 text-gray-400 text-center">Fetching contacts...</p>
    );
  }

  return (
    <ol className="flex flex-col gap-2 mx-4 sm:mx-auto sm:w-[640px]">
      {contacts.map((contact) => (
        <li>
          <ContactListItem contact={contact} onClick={handleClick} />
        </li>
      ))}
    </ol>
  );
};

interface ContactListItemProps {
  contact: ContactType;
  onClick?: (id: number) => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick?.(contact.id)}
      className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md p-4 transition cursor-pointer"
    >
      <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12 overflow-hidden">
        <User className="text-gray-400" size={24} />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{contact.username}</span>
        <span className="text-gray-500 text-sm">{contact.email}</span>
        <span className="text-gray-400 text-xs">{contact.address.city}</span>
      </div>
    </div>
  );
};

export { ContactList };
