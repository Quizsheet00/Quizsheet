const SUPABASE_URL = https://hjdadrztyuysxntmxolh.supabase.co;
const SUPABASE_KEY = sb_publishable_bf6orgWbQgwjycYWgLmvUg_Z8s6mGV3

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please enter email and password");
    return;
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
    alert("Wrong email or password");
    return;
  }

  alert("Login successful!");

  window.location.href = "dashboard.html";
}

async function login() {
  alert("LOGIN BUTTON WORKING");
}

function showLogin() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("login").style.display = "block";
}
