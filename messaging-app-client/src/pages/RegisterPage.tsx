import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormFields = {
  username: string;
  password: string;
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as { error: string }).error || "An error occurred"
        );
      }

      navigate("/auth/login");
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen border border-red-500">
      <div className="flex flex-col items-center rounded-3xl bg-gray-700 p-44">
        <h1 className="mb-4 text-slate-50">Register</h1>
        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="mb-1 text-slate-50">
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
                className="border border-indigo-500 rounded-md px-2 py-1 focus:border-2"
              />
              {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-1 text-slate-50">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                id="password"
                className="border border-indigo-500 rounded-md px-2 py-1 focus:border-2"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Loading..." : "Register"}
            ></Button>
            {errors.root && (
              <div className="text-red-500 mt-4">{errors.root.message}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
