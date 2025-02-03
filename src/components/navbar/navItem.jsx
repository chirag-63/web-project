import Link from "next/link";

const NavItem = ({ text, href, icon }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 mx-1 px-4 py-2 rounded-lg text-white transition-all duration-300 ease-in-out 
                 hover:bg-white/10 hover:scale-105 hover:text-purple-400"
    >
      {icon && (
        <span className="text-sm transition-all duration-300">{icon}</span>
      )}
      <span className="text-base font-medium">{text}</span>
    </Link>
  );
};

export default NavItem;
