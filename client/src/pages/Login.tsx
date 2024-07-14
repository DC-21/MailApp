const Login = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-300">
      <form
        className="w-1/3 flex flex-col p-4 rounded-xl bg-shite shadow shadow-black bg-white"
        action=""
      >
        <p className="text-center text-xl font-bold text-slate-900">Login</p>
        <div className="gap-6 flex flex-col w-full mt-4">
          <input
            type="email"
            id="email"
            placeholder="email"
            className="p-3 rounded-lg outline-none border-2 border-slate-700 text-slate-900"
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="p-3 rounded-lg outline-none border-2 border-slate-700 text-slate-900"
          />
          <button className="p-3 bg-slate-900 shadow shadow-black text-white rounded-lg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
