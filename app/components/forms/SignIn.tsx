"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User logged in.");
        localStorage.setItem("token", data.token);
        console.log(`${data.token}`);
        setLoading(false);
        router.push("/dashboard/my-todos");
      } else {
        setLoading(false);
        setErrorMessage(true);
        console.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome back 👋</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={19}
              height={19}
              color={"#000000"}
              fill={"none"}
            >
              <path
                d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <label className="block text-gray-700 text-sm ml-1" htmlFor="email">
              Email
            </label>
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={19}
              height={19}
              color={"#000000"}
              fill={"none"}
            >
              <path
                d="M12 16.5V14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="block text-gray-700 text-sm ml-1" htmlFor="password">
              Password
            </label>
          </div>

          <div className="relative focus:border-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full pr-10 focus:border-blue-300 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          <a
            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot password?
          </a>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Sign In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between">
        <span className="inline-block align-baseline text-sm">
          Don’t have an account?{" "}
          <a className="text-blue-500 hover:text-blue-800" href="/sign-up">
            Signup
          </a>
        </span>
      </div>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-400">Or</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className="flex justify-center">
        <button
          className="flex items-center justify-center hover:bg-reed-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full border border-black"
          type="button"
        >
          <FcGoogle className="mr-2 text-xl" />
          Login with Google
        </button>
      </div>
      <div className="mt-4">
        {errorMessage && (
          <p className="text-sm text-red-500">
            Either your email or password is invalid!
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
