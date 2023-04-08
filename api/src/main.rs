use axum::{routing::get, Router, response::{IntoResponse, Html}, extract::Query};
use reqwest::Client;
use serde::Deserialize;
use std::collections::HashMap;

#[derive(Deserialize)]
struct AccessTokenResponse {
    access_token: String,
    token_type: String,
    scope: String,
}

async fn hello_world() -> &'static str {
    "Hello, world!"
}

async fn auth_callback(query: Query<HashMap<String, String>>) -> impl IntoResponse {
    let code = match query.get("code") {
        Some(code) => code,
        None => {
            return Html(
                "<html><body><h1>Error: Missing GitHub OAuth code</h1></body></html>".to_string(),
            )
        }
    };

    let client_id = "your_client_id"; // Replace with your GitHub OAuth app's Client ID
    let client_secret = "your_client_secret"; // Replace with your GitHub OAuth app's Client Secret

    let client = Client::new();
    let token_url = "https://github.com/login/oauth/access_token";
    let params = [
        ("client_id", client_id),
        ("client_secret", client_secret),
        ("code", code),
    ];

    let res: AccessTokenResponse = client
        .post(token_url)
        .form(&params)
        .header("Accept", "application/json")
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();

    let access_token = res.access_token;

    // ... (create a session and store the user information) ...

    Html("<html><body><h1>Authenticated!</h1></body></html>".to_string())
}

#[shuttle_runtime::main]
async fn axum() -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
        .route("/hello", get(hello_world))
        .route("/auth/callback", get(auth_callback));

    Ok(router.into())
}