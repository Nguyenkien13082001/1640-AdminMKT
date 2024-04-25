import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../style/loginForm.css";
import { loginApi } from "../service/userService";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPass, setIsShowPass] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    if (!email || !password) {
      toast.error("You need to enter the email and password");
      return;
    }
    setLoadingAPI(true);
    let res = await loginApi(email, password);
    console.log(res.data);
    try {
      const data = res.data;
      if (data) {
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("user_id", data.user._id);
        localStorage.setItem("accessToken", data.accessToken);
        if (data.user.role === "admin") {
          navigate("/admin");
          toast.success("Login successful!!!");
        } else if (data.user.role === "marketing manager") {
          navigate("/marketing/home");
          toast.success("Login successful!!!");
        } else if (data.user.role === "marketing coordinator") {
          navigate("/coordinator/home");
          toast.success("Login successful!!!");
        } else {
          toast.error("You must be a role admin/marketing to render this site");
        }
      }
    } catch (error) {
      toast.error("Wrong email or password");
    }
    setLoadingAPI(false);
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h1>Login Admin</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <i className="fa-solid fa-user icon"></i>
          </div>
          <div className="input-box">
            <input
              type={isShowPass === true ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <i
              className={
                isShowPass === true
                  ? "fa-solid fa-eye icon"
                  : "fa-solid fa-eye-slash icon"
              }
              onClick={() => setIsShowPass(!isShowPass)}
            ></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot-password">Forgot password</a>
          </div>
          <button type="submit" disabled={email && password ? false : true}>
            Login {loadingAPI && <Spinner animation="border" variant="info" size="sm"/>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(LoginForm);
