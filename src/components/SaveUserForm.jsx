
// 📁 src/components/SaveUserForm.jsx

import { useActionState } from "react";
import { saveUserToStore } from "../services/userApi";

// 🧠 Initial state for our form action
const initialState = {
    // 👤 Read the initially saved user from localStorage
    currentUser: JSON.parse(localStorage.getItem("username")) || null,
    error: ''
}

function SaveUserForm() {

    //  ⚛️ React 19: useActionState manages the result of our form action.

    // state     → contains the current user and any error
    // formAction → function React connects to the <form>
    // isPending  → tells us whether the action is currently running
    const [state, formAction, isPending] = useActionState(handleSubmit, initialState)

    /*
     * ⚛️ React 19 Action
     *
     * The Action receives:
     *
     * 1️⃣ previousState → the state from the previous submission
     * 2️⃣ formData      → the values submitted by the form
     */
    async function handleSubmit(previousState, formData) {

        // 📦 Get the username entered in the form
        const trimmedUsername = formData.get('newuser').trim();

        try {
            // 💾 Save the username using our existing service
            const savedUser = await saveUserToStore(trimmedUsername);

            // ✅ Saving succeeded.
            //    Return the newly saved user as the new state.
            return {
                ...previousState,
                currentUser: savedUser,
                error: ''
            }
        } catch (err) {
            /*
             * ❌ Saving failed.
             *
             * 👤 Keep the previous stored username.
             * 🚫 Do NOT replace it with the failed username.
             */
            return {
                ...previousState,
                error: err.message
            }

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
                    <strong>{state?.currentUser?.currentUser || "Guest"}</strong>
                </div>

                {/* ⚛️ React 19: form submission is handled by our Action */}
                <form action={formAction}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        {/*
                         * 📝 We no longer need useState for the input.
                         *
                         * 📦 The entered value will be available inside
                         *    the Action through FormData.
                         */}
                        <input
                            id="username"
                            name="newuser"
                            type="text"
                            placeholder="Enter a username"
                            required
                            minLength={3}
                            disabled={isPending}
                        />
                        <p className="input-hint">
                            Enter at least 3 characters.
                        </p>
                    </div>

                    {/* ❌ Display the error returned by the Action */}
                    {state?.error && (
                        <p className="error-message" role="alert">
                            {state?.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isPending}
                    >
                        {isPending && (
                            <span className="spinner" aria-hidden="true" />
                        )}
                        {isPending ? "Saving..." : "Save Username"}
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
