import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
  },
];

const initializeStorage = () => {
  const existingUsers = localStorage.getItem("users");
  if (!existingUsers) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
  }
};

const api = {
  getUser: async (id: number): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: User) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  },

  updateUser: async (userData: User): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: User) =>
      u.id === userData.id ? userData : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return userData;
  },
};
initializeStorage();
// CODE

const initialFormData = {
  name: "",
  email: "",
  role: "user",
  status: "active",
};

export const UpdateFormExample: React.FC = () => {
  const [userId, setUserId] = useState<number>(1);

  const { data: user, error, isLoading, refetch } = useUser(userId);

  const [userFormData, setUserFormData] = useState<Partial<User>>({});

  const formData = {
    ...initialFormData,
    ...user,
    ...userFormData,
  };

  const [isSaving, setIsSaving] = useState(false);

  let timeout = 0;
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedFormData = (prev: Partial<User>) => ({
      ...prev,
      [name]: value,
    });

    setUserFormData(updatedFormData);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsSaving(true);

      if (!user) return;

      api
        .updateUser({
          ...initialFormData,
          ...user,
          ...updatedFormData(userFormData),
        })
        .then(async () => {
          await refetch();
          setIsSaving(false);
          setUserFormData({});
        })
        .finally(() => {
          setIsSaving(false);
        });
    }, 1000);
  };

  const handleUserSwitch = () => {
    setUserId((prev) => (prev === 1 ? 2 : 1));
    setUserFormData({});
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wrong Form Update Implementation</h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleUserSwitch}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Switch to User {userId === 1 ? "2" : "1"}
        </button>
        {isSaving && (
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Saving changes...
          </span>
        )}
      </div>

      {isLoading && !user ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
          }}
        >
          Loading...
        </div>
      ) : (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "400px",
          }}
        >
          {error && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </form>
      )}
    </div>
  );
};

function useUser(userId: number) {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await api.getUser(userId);
      setData(user);
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [userId]);

  return { data, isLoading, error, refetch };
}
