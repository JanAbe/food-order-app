export async function getMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const data = response.json();

  if (!response.ok) {
    throw new Error("Problem fetching meals");
  }

  return data;
}

export async function placeOrder(data) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  if (!response.ok) {
    console.error(responseData.message);
    throw new Error("Failed to place order");
  }
  console.log(responseData.message);
}
