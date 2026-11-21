const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const form = document.getElementById("reportForm");
const statusBox = document.getElementById("formStatus");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button[type='submit']");
  const data = Object.fromEntries(new FormData(form).entries());

  const cfg = window.GANGA_CONFIG;
  if (!cfg) {
    showStatus("js/config.js did not load. Make sure the file exists at js/config.js on the server, then redeploy.", "error");
    return;
  }
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey ||
      cfg.supabaseUrl.startsWith("YOUR_") ||
      cfg.supabaseAnonKey.startsWith("YOUR_")) {
    showStatus("config.js still has placeholder values. Add your Supabase URL and key, then redeploy.", "error");
    return;
  }

  if (!window.supabase) {
    showStatus("Database library did not load. Check your internet connection and refresh.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Submitting…";
  try {
    const client = window.supabase.createClient(
      window.GANGA_CONFIG.supabaseUrl,
      window.GANGA_CONFIG.supabaseAnonKey
    );
    const { error } = await client.from("reports").insert([{
      name: data.name.trim(),
      email: data.email.trim(),
      location: data.location.trim(),
      category: data.category,
      message: data.message.trim()
    }]);
    if (error) throw error;
    form.reset();
    showStatus("Thank you! Your report has been saved successfully.", "success");
  } catch (error) {
    console.error(error);
    showStatus("Could not save your report. Check the Supabase table and connection settings.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit report <span>↗</span>';
  }
});
