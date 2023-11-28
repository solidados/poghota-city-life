import { useState } from "react";
import { useRegister } from '../hooks/useRegister'

const Register = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const { register, isLoading, error } = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(email, password)
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>

      <label>First Name:
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>Surname:
        <input
          type="text"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
        />
      </label>

      <label>Email:
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>Phone:
        <input
          type="tel"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phone_number}
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
      </label>

      <label>Password:
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
