import { useEffect, useState } from "react";

import type { ContactType } from "../types/company";
import { useNavigate, useParams } from "react-router";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  MoveLeftIcon,
  Phone,
  User,
} from "lucide-react";

const ContactDetailsPage = () => {
  const { id: contactId } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState<ContactType | undefined>();
  const [loading, setLoading] = useState(true);

  async function fetchContact(contactId: number) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${contactId}`
      );

      if (!response.ok) {
        return new Error("Fetch returned with error response");
      }

      const data = await response.json();
      setContact(data);
    } catch (err) {
      console.error("Fetch contacts failed, ", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (contactId) {
      fetchContact(parseInt(contactId));
    }
  }, [contactId]);

  if (loading) {
    return (
      <p className="mt-4 text-gray-400 text-center">
        Fetching contact details...
      </p>
    );
  }

  if (!contact) {
    return (
      <p className="mt-4 text-red-400 text-center">
        Error fetching contact. Please check the contact ID.
      </p>
    );
  }

  return (
    <>
      <MoveLeftIcon
        size={24}
        className="inline-block shadow-sm shadow-stone-400 ml-2 p-1 rounded-md text-stone-800"
        onClick={() => navigate("/contacts")}
      />
      <div className="space-y-6 bg-white shadow-md mx-auto p-6 rounded-2xl max-w-2xl">
        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center bg-gray-100 rounded-full w-20 h-20 overflow-hidden">
            <User className="text-gray-400" size={36} />
          </div>

          <div>
            <h1 className="font-bold text-gray-800 text-2xl">
              {contact.username}
            </h1>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} className="text-blue-500" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={18} className="text-green-500" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Globe size={18} className="text-purple-500" />
            <a
              href={`https://${contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {contact.website}
            </a>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
            <Building2 size={20} className="text-orange-500" /> Company
          </h2>
          <p className="mt-1 font-medium">{contact.company.name}</p>
          <p className="text-gray-500 text-sm italic">
            “{contact.company.catchPhrase}”
          </p>
        </div>

        <div className="pt-4 border-t">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
            <MapPin size={20} className="text-red-500" /> Address
          </h2>
          <p className="mt-1 text-gray-600">
            {contact.address.suite}, {contact.address.street},{" "}
            {contact.address.city}, {contact.address.zip}
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactDetailsPage;
