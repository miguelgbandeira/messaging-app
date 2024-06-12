import Button from "../components/Button";

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen border border-red-500">
      <div className="flex flex-col items-center">
        <h1 className="mb-4">Login</h1>
        <form className="flex flex-col items-start">
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border border-indigo-500 rounded-md px-2 py-1 focus:border-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-indigo-500 rounded-md px-2 py-1 focus:border-2"
            />
          </div>
        </form>
        <Button label="Login" onClick={() => null}></Button>
      </div>
    </div>
  );
}

export default LoginPage;
