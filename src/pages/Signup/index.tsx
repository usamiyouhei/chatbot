import { Link } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { authRepository } from "../../modules/auth/auth.repository";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signup = async () => {
    setIsLoading(true);
    try {
      const { user, token } = await authRepository.signup(
        name,
        email,
        password,
      );
      console.log(user, token);
    } catch (error) {
      console.error(error);
      alert("ユーザー登録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">アカウント作成</h1>

        <div className="auth-form-container">
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              id="username"
              type="text"
              placeholder="山田太郎"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              placeholder="8文字以上"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="auth-button"
            disabled={isLoading || !name || !email || !password}
            onClick={signup}
          >
            アカウント作成
          </button>
        </div>

        <p className="auth-footer">
          既にアカウントをお持ちの方は
          <Link to="/signin">ログイン</Link>
        </p>
      </div>
    </div>
  );
}
