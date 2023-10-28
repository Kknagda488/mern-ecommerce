export function fetchLoggedInUserOrders(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/api/orders/orders')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchLoggedInUser(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/api/Users/' + id)
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/api/Users/updateUser' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}


