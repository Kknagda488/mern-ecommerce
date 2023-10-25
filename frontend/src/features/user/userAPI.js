export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/api/orders/') 
    const data = await response.json()
    resolve({data})
  }
  );
}


export function fetchLoggedInUser(user) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/api/Users') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/api/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}


