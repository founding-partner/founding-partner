import type { Component } from "solid-js";
import { createEffect } from "solid-js";

const LoginButton: Component = () => {
  const GITHUB_CLIENT_ID = "fd90a4fc1ead82611a9d"; // Replace with your GitHub OAuth app's Client ID
  const GITHUB_REDIRECT_URI = "http://localhost:3001/"; // Replace with your callback URL (must be registered in your GitHub OAuth app)
  const GITHUB_SCOPE = "read:user,read:org"; // Adjust the scope based on your requirements

  const redirectToAuth = () => {
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.append("client_id", GITHUB_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", GITHUB_REDIRECT_URI);
    authUrl.searchParams.append("scope", GITHUB_SCOPE);

    window.location.href = authUrl.toString();
  };

  return (
    <button
      onClick={redirectToAuth}
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 flex items-center gap-1 mx-auto"
      disabled
    >
      <svg
        class="h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.237-.009-.868-.014-1.704-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.465-1.11-1.465-.908-.62.068-.608.068-.608 1.003.071 1.532 1.031 1.532 1.031.891 1.529 2.341 1.089 2.912.833.09-.647.349-1.088.635-1.339-2.22-.254-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.104-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.847c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.204 2.394.1 2.647.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.31.678.917.678 1.852 0 1.335-.012 2.415-.012 2.741 0 .269.18.578.688.479C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
      Join using GitHub (WIP)
    </button>
  );
};

export default LoginButton;
