export async function getFacility({ latitude, longitude }) {
  const res = await fetch(`http://localhost:8080/facility?latitude=${latitude}&longitude=${longitude}`);
  return res.json();
}

export async function searchFacility({ q }) {
  const res = await fetch(`http://localhost:8080/search?q=${q}`);
  return res.json();
}
