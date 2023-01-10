import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post("/api/users/login", value);
      message.success("Login Successfully");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      message.error("Something went wrong");
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };

  //   currently login users
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login">
        <div className="login-form">
          <h3>Login Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="d-flex" style={{ margin: "10px 20px" }}>
                New User?
                <Link
                  to="/register"
                  style={{ textDecoration: "none", marginLeft: "2px" }}
                >
                  Register Here
                </Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
