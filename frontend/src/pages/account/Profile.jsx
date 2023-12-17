import { useState, useEffect } from "react";
import { useRegister } from "../../hooks/useRegister";
import { useAuthContext } from "../../hooks/useAuthContext";

function Profile () {
  const { user } = useAuthContext()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState(user.email)
  const [phone_number, setPhoneNumber] = useState(user.phone_number)
  const [password, setPassword] = useState(user.password)
  const { register, isLoading, error } = useRegister()
  const value = 'account/profile'
  const meth = 'PUT'
  const token = user.token

  useEffect(() => {
    setEmail(user.email);
    setPhoneNumber(user.phone_number);
    setPassword(user.password);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register(name, surname, email, phone_number, password, value, meth, token)
  }
  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
       <label>
        First Name:
        <input
          type="text"
          name="firstName"
          readOnly
          value={user.name}
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          name="surName"
          readOnly
          value={user.surname}
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
        <button disabled={isLoading}>Update</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Profile;
