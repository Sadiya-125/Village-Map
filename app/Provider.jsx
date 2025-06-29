import Header from "./_components/Header";

const Provider = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-15">{children}</div>
    </div>
  );
};

export default Provider;
