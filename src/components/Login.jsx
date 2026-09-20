import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function Login() {
  const [isLogin, setisLogin] = useState(false);
  const [Fullname, setFullname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getInputData = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post(
          `${API_END_POINT}/login`,
          {
            Email,
            Password,
          },
          {
            withCredentials: true,
          }
        );

        console.log(res);

        if (res.data.success) {
          toast.success(res.data.message);

          dispatch(setUser(res.data.user));

          navigate("/browse");
        }
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data?.message || "Login failed"
        );
      }
    } else {
      try {
        const res = await axios.post(
          `${API_END_POINT}/register`,
          {
            Fullname,
            Email,
            Password,
          }
        );

        console.log(res);

        if (res.data.success) {
          toast.success(res.data.message);

          setisLogin(true);
        }
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data?.message || "Registration failed"
        );
      }
    }

    setFullname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header />

      <div className="relative h-screen w-full overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="./Assets/Backimage2.jpg"
          alt="Backimage"
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <form
            onSubmit={getInputData}
            className="flex h-[clamp(250px,70vh,400px)] w-[70vw] max-w-[400px] items-center justify-center rounded-3xl bg-black/80"
          >
            <div className="flex w-[90%] flex-col text-white">
              <h1 className="mb-[clamp(12px,2vw,32px)] text-center text-[clamp(18px,2vw,24px)]">
                {isLogin ? "Login" : "Signup"}
              </h1>

              {!isLogin && (
                <input
                  className="mb-[clamp(8px,1.5vw,28px)] w-full rounded-md border border-white/30 bg-white/10 p-[clamp(5px,0.7vw,8px)] text-[clamp(12px,1.5vw,20px)] text-white backdrop-blur-md placeholder-white/50 transition duration-300 focus:border-white/60 focus:bg-white/20 focus:outline-none"
                  placeholder="Enter Your Name"
                  type="text"
                  value={Fullname}
                  onChange={(event) =>
                    setFullname(event.target.value)
                  }
                />
              )}

              <input
                className="mb-[clamp(8px,1.5vw,28px)] w-full rounded-md border border-white/30 bg-white/10 p-[clamp(5px,0.7vw,8px)] text-[clamp(12px,1.5vw,20px)] text-white backdrop-blur-md placeholder-white/50 transition duration-300 focus:border-white/60 focus:bg-white/20 focus:outline-none"
                placeholder="Enter Your Email"
                type="email"
                value={Email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

              <input
                className="mb-[clamp(8px,1.5vw,28px)] w-full rounded-md border border-white/30 bg-white/10 p-[clamp(5px,0.7vw,8px)] text-[clamp(12px,1.5vw,20px)] text-white backdrop-blur-md placeholder-white/50 transition duration-300 focus:border-white/60 focus:bg-white/20 focus:outline-none"
                placeholder="Enter Your Password"
                type="password"
                value={Password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                type="submit"
                className="w-full rounded-md bg-red-600 p-[clamp(5px,0.7vw,8px)] text-[clamp(12px,1.5vw,20px)] text-white transition duration-200 hover:bg-red-700"
              >
                {isLogin ? "Login" : "Signup"}
              </button>

              {!isLogin && (
                <p
                  onClick={() => setisLogin(true)}
                  className="mt-[clamp(8px,1vw,20px)] cursor-pointer text-center text-[clamp(10px,1vw,16px)] text-white/70 transition duration-200 hover:text-white"
                >
                  Already have an account?{" "}
                  <span className="text-red-400">Login</span>
                </p>
              )}

              {isLogin && (
                <p
                  onClick={() => setisLogin(false)}
                  className="mt-[clamp(8px,1vw,20px)] cursor-pointer text-center text-[clamp(10px,1vw,16px)] text-white/70 transition duration-200 hover:text-white"
                >
                  New to Netflix?{" "}
                  <span className="text-red-400">Signup</span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
          