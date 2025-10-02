import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import SocialLogin from "../../components/SocialLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerFields = [
    {
      id: 1,
      label: "Name",
      placeholder: "Enter Your Name",
      type: "text",
      value: form.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, name: e.target.value }),
    },
    {
      id: 2,
      label: "Email",
      placeholder: "Enter Your Email",
      type: "email",
      value: form.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, email: e.target.value }),
    },
    {
      id: 3,
      label: "Password",
      placeholder: "Enter Your Password",
      type: "password",
      value: form.password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, password: e.target.value }),
    },
  ];

  const handleSignup = async () => {
    if (form.name == "" && form.email == "" && form.password == "") {
      alert("All fields are required");
    } else {
      const url = "http://localhost:3000/users/add-user";

      try {
        setIsLoading(true);
        const response = await axios.post(url, form);
        console.log("response===>>>>", response?.data);
        setIsLoading(false);
        navigate("/login");
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
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <div className="space-y-4">
            {registerFields.map((field) => (
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
              label={isLoading ? "signing up..." : "Sign Up"}
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            />
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin onClick={() => console.log("press")} />
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
