const Header = ({ title, username }: { title: string; username: string }) => {
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2>{title}</h2>
      <h2>Welcome back, {username}</h2>
    </div>
  );
};

export default Header;
