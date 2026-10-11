// 📁 src/api/userService.js

/**
 * 💾 Simulates saving the username to a backend/store.
 *
 * ⏳ We intentionally add a 3-second delay so that
 *    the loading/pending state is easy to observe.
 *
 * ❌ If the username contains "error", the promise rejects.
 * ✅ Otherwise, the username is saved to localStorage.
 */
export function saveUserToStore(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // ❌ Simulate a failed API request
            if (username.toLowerCase().includes("error")) {
                reject(new Error("Error in Saving User"));
                return;
            }

            // 💾 Simulate successfully saving the user
            localStorage.setItem(
                "username",
                JSON.stringify({ currentUser: username })
            );

            // ✅ Simulate a successful API response
            resolve({ currentUser: username });
        }, 3000);
    });
}