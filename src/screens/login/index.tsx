import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialLogin from "../../components/SocialLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginFields = [
    {
      id: 1,
      label: "Email",
      placeholder: "Enter Your Email",
      type: "email",
      value: form.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, email: e.target.value }),
    },
    {
      id: 2,
      label: "Password",
      placeholder: "Enter Your Password",
      type: "password",
      value: form.password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, password: e.target.value }),
    },
  ];

  const handleLogin = async () => {
    if (form.email == "" && form.password == "") {
      alert("Please Entter Email and password");
    } else {
      const url = "http://localhost:3000/users/login";

      try {
        setIsLoading(true);
        const response = await axios.post(url, form);
        console.log("response===>>>>", response.data);
        localStorage.setItem(
          "auth",
          JSON.stringify({ loggedIn: true, token: response.data.accessToken })
        );
        setIsLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        alert("Error sending data: " + error);
        console.error("Error sending data: ", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md w-96">
        {/* Body */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <div className="space-y-4">
            {loginFields.map((field) => (
              <Input
                key={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
              />
            ))}

            <Button
              label={isLoading ? "Login in..." : "Login"}
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            />
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin onClick={() => console.log("press")} />
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
