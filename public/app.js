async function createOrder() {
  const user_id = document.getElementById("user_id").value;
  const order_id = document.getElementById("order_id").value;

  const res = await fetch("/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, order_id })
  });

  const data = await res.json();

  document.getElementById("result").innerText =
    data.message || data.error;
}