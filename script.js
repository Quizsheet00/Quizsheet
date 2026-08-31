const SUPABASE_URL = "https://hjdadrztyuysxntmxolh.supabase.co";
const SUPABASE_KEY = "sb_publishable_bf6orgWbQgwjycYWgLmvUg_Z8s6mGV3";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
async function login() {

  const email = document.getElementById("username").value;
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

function showLogin() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("login").style.display = "block";
}
async function loadStudentData() {

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("studentName").innerText =
    user.user_metadata?.name || "Student";

  document.getElementById("studentId").innerText =
    user.user_metadata?.student_id || "Not Available";

}
