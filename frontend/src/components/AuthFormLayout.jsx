const AuthFormLayout = ({ children }) => {
  return (
    <section className="bg-[#8BABD8]">
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="w-md bg-white rounded-lg px-14 py-10 relative">
          <img
            src="/dottedShape.svg"
            alt="dotted shape"
            className="absolute -top-5 -right-5 rotate-180"
          />
          <img
            src="/dottedShape.svg"
            alt="dotted shape"
            className="absolute -bottom-5 -left-5"
          />

          <div className="w-56 mx-auto">
            <img src="/logo.png" alt="logo" className="object-contain" />
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthFormLayout;