import { useEffect } from "react";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContextType } from "../App";

type FormFields = {
  username: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const navigate = useNavigate();
  const { user, fetchLoggedInUser } = useOutletContext<AuthContextType>();

  useEffect(() => {
    if (user) {
      toast.info("You are already logged in");
      navigate("/");
      return;
    }
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          (responseData as { error: string }).error || "An error occurred"
        );
      }

      const { token } = responseData;
      localStorage.setItem("token", token);
      await fetchLoggedInUser();
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };

  const handleGuestLogin = () => {
    setValue("username", "guest");
    setValue("password", "guest123");
    handleSubmit(onSubmit)();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex flex-col items-center rounded-3xl bg-gray-700 p-10 w-full max-w-md">
        <h1 className="mb-4 text-gray-200 text-xl">Login</h1>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full mb-4">
            <label htmlFor="username" className="mb-1 text-gray-200">
              Username
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                maxLength: {
                  value: 100,
                  message: "Username can't have more than 100 characters",
                },
              })}
              type="text"
              id="username"
              className="w-full border border-indigo-500 rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
            {/* Placeholder for error message height */}
            <div style={{ minHeight: "1.5rem" }}>
              {errors.username && (
                <div className="text-red-500 text-sm">
                  {errors.username.message}
                </div>
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <label htmlFor="password" className="mb-1 text-gray-200">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              className="w-full border border-indigo-500 rounded-md px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
            {/* Placeholder for error message height */}
            <div style={{ minHeight: "1.5rem" }}>
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Loading..." : "Submit"}
              type="submit"
            />
            <Button
              onClick={handleGuestLogin}
              label="Login as Guest"
              color="bg-gray-300"
              textColor="text-black"
            />
          </div>
          {errors.root && (
            <div className="text-red-500 mt-4">{errors.root.message}</div>
          )}
        </form>
        <div className="text-gray-200 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-indigo-500 underline">
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
