
// 📁 src/components/SaveUserForm.jsx

import { useState } from "react";
import { saveUserToStore } from "../services/userApi";

function SaveUserForm() {
    // 👤 Read the initially saved user
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(localStorage.getItem("username")) || null;
    });

    // ✏️ Controlled input state
    const [username, setUsername] = useState("");

    // ⏳ Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // 📝 Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedUsername = username.trim();

        // 🧹 Clear previous error
        setError("");
        setIsLoading(true);

        try {
            // 💾 Simulate saving to a backend
            const savedUser = await saveUserToStore(trimmedUsername);

            // ✅ Update UI with persisted user
            setCurrentUser(savedUser);

            // 🧹 Clear input after success
            setUsername("");
        } catch (err) {
            // ❌ Display the service error
            setError(err.message);
        } finally {
            // ⏳ Stop loading in both outcomes
            setIsLoading(false);
        }
    }

    return (
        <main className="app">
            <section className="card">
                <div className="card-heading">
                    <span className="eyebrow">USER MANAGEMENT</span>
                    <h1>Update Username</h1>
                    <p className="subtitle">
                        Save your username using a simulated API request.
                    </p>
                </div>

                {/* 👤 Currently saved username */}
                <div className="current-user">
                    <span className="current-user-label">Current User</span>
                    <strong>{currentUser?.currentUser || "Guest"}</strong>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Enter a username"
                            required
                            minLength={3}
                            disabled={isLoading}
                        />
                        <p className="input-hint">
                            Enter at least 3 characters.
                        </p>
                    </div>

                    {/* ❌ Service error */}
                    {error && (
                        <p className="error-message" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <span className="spinner" aria-hidden="true" />
                        )}
                        {isLoading ? "Saving..." : "Save Username"}
                    </button>
                </form>

                <p className="demo-hint">
                    Tip: Include "error" in the username to simulate
                    a failed request.
                </p>
            </section>
        </main>
    );
}

export default SaveUserForm;
