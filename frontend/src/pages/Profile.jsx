import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
export default function Profile() {
  const { user } = useContext(AuthContext);
  if(!user) return <div className="container py-6">Please login</div>;
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4 bg-white p-4 rounded shadow max-w-md">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
      </div>
    </div>
  );
}
