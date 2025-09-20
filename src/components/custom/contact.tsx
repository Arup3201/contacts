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

  const grouped = groupContactsByFirstLetter(contacts);

  return (
    <ol className="flex flex-col gap-2 mx-4 sm:mx-auto sm:w-[640px]">
      {Object.entries(grouped).map(([letter, contacts]) => (
        <div key={letter} className="mb-6">
          <h2 className="bg-stone-400 mb-2 p-2 font-bold text-gray-200 text-md">{letter}</h2>
          <div className="space-y-2">
            {contacts.map((contact) => (
              <li>
                <ContactListItem contact={contact} onClick={handleClick} />
              </li>
            ))}
          </div>
        </div>
      ))}
    </ol>
  );
};

function groupContactsByFirstLetter(contacts: ContactType[]) {
  const groups: Record<string, ContactType[]> = {};

  contacts.forEach((contact) => {
    const firstLetter = contact.username.charAt(0).toUpperCase();

    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }

    groups[firstLetter].push(contact);
  });

  // Optional: sort each group’s contacts alphabetically
  Object.keys(groups).forEach((letter) => {
    groups[letter].sort((a, b) => a.username.localeCompare(b.username));
  });

  // Return sorted groups (A-Z)
  return Object.keys(groups)
    .sort()
    .reduce((acc, key) => {
      acc[key] = groups[key];
      return acc;
    }, {} as Record<string, ContactType[]>);
}

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
