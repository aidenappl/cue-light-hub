import Button from "../Button";

const Header = () => {
  return (
    <header className="bg-slate-800 text-white p-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <Button href="/logout">Logout</Button>
    </header>
  );
};

export default Header;
