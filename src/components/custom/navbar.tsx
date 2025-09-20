import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface OptionType {
  value: string;
  name: string;
}
const OPTIONS: OptionType[] = [
  {
    value: "/",
    name: "Home",
  },
  {
    value: "contacts",
    name: "Contacts",
  },
];
const Navbar = () => {
  const [active, setActive] = useState<OptionType>(OPTIONS[0]);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-center items-center bg-stone-800 shadow-sm shadow-stone-400 sm:shadow-md px-2 text-gray-200 sm:text-xl">
      <ul className="flex items-center gap-2 px-1 sm:px-2 py-2 sm:py-4">
        {OPTIONS.map((option) => (
          <li
            onClick={() => {
              setActive(option);
              navigate(option.value);
            }}
            className={option.value === active.value ? "" : "text-gray-400"}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navbar };
