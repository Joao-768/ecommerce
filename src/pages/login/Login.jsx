import './login.css'

export default function Login() {
  return (
    <div className="login">
        <h1 className='title-login'>Login</h1>
        <div className="create-account">
            <h2>Create a Void account</h2>
            Join VOID and unlock a more personal experience of time.
            <ul>
                <li>Instant checkout</li>
                <li>Order tracking</li>
                <li>Receive custom suggestions</li>
                <li>Add Watches to your wishlist</li>
            </ul>
            <button>Create Account</button>
        </div>
        <div className="login-form">
            <h2>Already have a Void account</h2>
            <form>
                *Email Adress<br/>
                <input type="email" placeholder="Email" required />
                <br/>*Password<br/>
                <input type="password" placeholder="Password" required />
                <br/>
                <button type="submit">Forgot Password</button>
                <br/>
                <button type="submit">Log In</button>
            </form>
        </div>
    </div>
  );
}