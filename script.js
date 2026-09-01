const SUPABASE_URL = "https://hjdadrztyuysxntmxolh.supabase.co";
const SUPABASE_KEY = "sb_publishable_bf6orgWbQgwjycYWgLmvUg_Z8s6mGV3";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ================= LOGIN =================

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

  window.location.href = "dashboard.html";
}


// ================= SHOW LOGIN =================

function showLogin() {

  document.getElementById("welcome").style.display = "none";

  document.getElementById("login").style.display = "block";
}


// ================= DASHBOARD =================

async function loadStudentData() {

  const { data: { user } } =
    await supabaseClient.auth.getUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const { data, error } =
    await supabaseClient
      .from("students")
      .select("*")
      .eq("user_id", user.id)
      .single();

  if (error) {
    console.log(error);
    alert("Student data not found");
    return;
  }

  document.getElementById("studentName").innerText =
    data.name || "Not available";

  document.getElementById("profession").innerText =
    data.profession || "Not available";

  document.getElementById("year").innerText =
    data.year || "Not available";

  document.getElementById("studentId").innerText =
    data.student_id || data["student id"] || "Not available";
}


// ================= LOGOUT =================

async function logout() {

  await supabaseClient.auth.signOut();

  window.location.href = "index.html";
}


// ================= RUN DASHBOARD =================

if (window.location.pathname.includes("dashboard.html")) {
  loadStudentData();
}
