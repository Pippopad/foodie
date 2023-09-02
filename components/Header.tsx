const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2>{title}</h2>
      <h2>Welcome back, Lorenzo</h2>
    </div>
  );
};

export default Header;
