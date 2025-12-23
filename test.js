import fetch from 'node-fetch';

async function run() {
  // POST Tenant
  let res = await fetch('http://localhost:5000/tenants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Tenant1', domain: 'tenant1.com' }),
  });
  console.log('POST:', await res.json());

  // GET Tenants
  res = await fetch('http://localhost:5000/tenants');
  console.log('GET:', await res.json());

  // PUT Tenant
  res = await fetch('http://localhost:5000/tenants/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Tenant1 Updated', domain: 'tenant1new.com' }),
  });
  console.log('PUT:', await res.json());

  // DELETE Tenant
  res = await fetch('http://localhost:5000/tenants/1', {
    method: 'DELETE',
  });
  console.log('DELETE:', await res.json());
}

run();
