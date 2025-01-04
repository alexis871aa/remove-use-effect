import { RouteObject } from "react-router-dom";

// Layout & Pages
import { Layout } from "../components/Layout";
import { WrongExamples } from "./WrongExamples";
import { SemiExamples } from "./SemiExamples";
import { CorrectExamples } from "./CorrectExamples";
import { Homework } from "./Homework";

// Wrong Examples
import { LoadingButtonExample } from "../examples/wrong/LoadingButtonExample";
import { CountdownExample } from "../examples/wrong/CountdownExample";
import { CheckboxListExample } from "../examples/wrong/CheckboxListExample";
import { UpdateFormExample } from "../examples/wrong/UpdateFormExample";
import { OptimisticUpdateExample } from "../examples/wrong/OptimisticUpdateExample";

// Semi Examples
import { AsyncLoading } from "../examples/semi/AsyncLoading";
import { ElementObserver } from "../examples/semi/ElementObserver";
import { LocalStorage } from "../examples/semi/LocalStorage";

// Homework Examples
import { CollapsibleTree } from "../examples/home-work/CollapsibleTree";
import { DebouncedSearch } from "../examples/home-work/DebouncedSearch";
import { EmailValidation } from "../examples/home-work/EmailValidation";
import { FormAutosave } from "../examples/home-work/FormAutosave";
import { MousePosition } from "../examples/home-work/MousePosition";
import { NetworkStatus } from "../examples/home-work/NetworkStatus";
import { ResizeObserverExample } from "../examples/home-work/ResizeObserverExample";
import { TypingEffect } from "../examples/home-work/TypingEffect";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <WrongExamples />,
      },
      {
        path: "wrong",
        children: [
          {
            index: true,
            element: <WrongExamples />,
          },
          {
            path: "loading-button",
            element: <LoadingButtonExample />,
          },
          {
            path: "countdown",
            element: <CountdownExample />,
          },
          {
            path: "checkbox",
            element: <CheckboxListExample />,
          },
          {
            path: "update-form",
            element: <UpdateFormExample />,
          },
          {
            path: "optimistic",
            element: <OptimisticUpdateExample />,
          },
        ],
      },
      {
        path: "semi",
        children: [
          {
            index: true,
            element: <SemiExamples />,
          },
          {
            path: "async-loading",
            element: <AsyncLoading />,
          },
          {
            path: "element-observer",
            element: <ElementObserver />,
          },
          {
            path: "local-storage",
            element: (
              <>
                <LocalStorage />
                <LocalStorage />
              </>
            ),
          },
        ],
      },
      {
        path: "correct",
        children: [
          {
            index: true,
            element: <CorrectExamples />,
          },
        ],
      },
      {
        path: "homework",
        children: [
          {
            index: true,
            element: <Homework />,
          },
          {
            path: "collapsible-tree",
            element: <CollapsibleTree />,
          },
          {
            path: "debounced-search",
            element: <DebouncedSearch />,
          },
          {
            path: "email-validation",
            element: <EmailValidation />,
          },
          {
            path: "form-autosave",
            element: <FormAutosave />,
          },
          {
            path: "mouse-position",
            element: <MousePosition />,
          },
          {
            path: "network-status",
            element: <NetworkStatus />,
          },
          {
            path: "resize-observer",
            element: <ResizeObserverExample />,
          },
          {
            path: "typing-effect",
            element: <TypingEffect />,
          },
        ],
      },
    ],
  },
];
