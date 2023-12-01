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

    await register(name, surname, email, phone_number, password)
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>

      <label>First Name:
        <input
          type="text"
          name="firsName"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>Surname:
        <input
          type="text"
          name="surName"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
        />
      </label>

      <label>Email:
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>Phone:
        <input
          type="tel"
          name="tel"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phone_number}
          // pattern="+[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
          placeholder="+37411223344"
        />
      </label>

      <label>Password:
        <input
          type="password"
          name="password"
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
