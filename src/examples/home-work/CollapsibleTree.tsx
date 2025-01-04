import React, { useState, useEffect } from "react";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface CollapsibleTreeProps {
  data?: TreeNode[];
  onCollapseAll?: () => void;
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  expandedNodes,
  toggleNode,
}) => {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px 0",
          cursor: hasChildren ? "pointer" : "default",
        }}
        onClick={() => hasChildren && toggleNode(node.id)}
      >
        {hasChildren && (
          <span style={{ marginRight: "8px", fontSize: "12px" }}>
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        <span>{node.label}</span>
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const exampleData: TreeNode[] = [
  {
    id: "1",
    label: "React Hooks",
    children: [
      {
        id: "1-1",
        label: "useState",
        children: [
          { id: "1-1-1", label: "Basic State" },
          { id: "1-1-2", label: "State with Objects" },
          { id: "1-1-3", label: "State with Arrays" },
        ],
      },
      {
        id: "1-2",
        label: "useEffect",
        children: [
          { id: "1-2-1", label: "Dependencies" },
          { id: "1-2-2", label: "Cleanup" },
          { id: "1-2-3", label: "API Calls" },
        ],
      },
      {
        id: "1-3",
        label: "Custom Hooks",
        children: [
          { id: "1-3-1", label: "useDebounce" },
          { id: "1-3-2", label: "useFetch" },
          { id: "1-3-3", label: "useLocalStorage" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "React Components",
    children: [
      {
        id: "2-1",
        label: "Functional Components",
        children: [
          { id: "2-1-1", label: "Props" },
          { id: "2-1-2", label: "Context" },
          { id: "2-1-3", label: "Refs" },
        ],
      },
      {
        id: "2-2",
        label: "Class Components",
        children: [
          { id: "2-2-1", label: "Lifecycle Methods" },
          { id: "2-2-2", label: "State Management" },
          { id: "2-2-3", label: "Event Handling" },
        ],
      },
    ],
  },
];

export const CollapsibleTree: React.FC<CollapsibleTreeProps> = ({
  data = exampleData,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set());
  };

  const handleExpandAll = () => {
    const getAllNodeIds = (nodes: TreeNode[]): string[] => {
      return nodes.reduce<string[]>((acc, node) => {
        acc.push(node.id);
        if (node.children) {
          acc.push(...getAllNodeIds(node.children));
        }
        return acc;
      }, []);
    };

    setExpandedNodes(new Set(getAllNodeIds(data)));
  };

  // Expand all nodes initially
  useEffect(() => {
    handleExpandAll();
  }, [data]);

  return (
    <div className="collapsible-tree">
      <h2>Collapsible Tree Example</h2>
      <p>
        A tree component demonstrating useEffect with cleanup and state
        management
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={handleExpandAll}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f0f0f0",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f0f0f0",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Collapse All
        </button>
      </div>

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        ))}
      </div>
    </div>
  );
};
