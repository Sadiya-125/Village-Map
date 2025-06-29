import Header from "./_components/Header";

const Provider = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Provider;
