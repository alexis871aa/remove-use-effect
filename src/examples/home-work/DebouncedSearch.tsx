import React, { useState, useEffect, useCallback } from "react";

interface SearchResult {
  id: number;
  title: string;
}

const mockAPI = async (query: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allItems = [
    { id: 1, title: "React Hooks" },
    { id: 2, title: "TypeScript Basics" },
    { id: 3, title: "JavaScript ES6" },
    { id: 4, title: "CSS Grid Layout" },
    { id: 5, title: "React Router" },
    { id: 6, title: "Redux State Management" },
    { id: 7, title: "Node.js Fundamentals" },
    { id: 8, title: "GraphQL Basics" },
  ];

  return allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const DebouncedSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const searchResults = await mockAPI(query);
      setResults(searchResults);
    } catch (err) {
      setError("Failed to fetch results");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        debouncedSearch(searchTerm);
      } else {
        setResults([]);
      }
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            color: "#2c3e50",
            marginBottom: "16px",
          }}
        >
          Debounced Search
        </h2>
        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Start typing to search..."
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "2px solid #e9ecef",
              borderRadius: "8px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
          {isLoading && (
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6c757d",
              }}
            >
              Searching...
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {results.map((result) => (
          <div
            key={result.id}
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              border: "1px solid #e9ecef",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#2c3e50",
                fontSize: "16px",
              }}
            >
              {result.title}
            </h3>
          </div>
        ))}
        {searchTerm && !isLoading && results.length === 0 && (
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              color: "#6c757d",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            No results found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};
