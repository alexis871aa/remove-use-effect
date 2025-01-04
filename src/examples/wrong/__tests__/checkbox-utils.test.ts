import { describe, it, expect } from "vitest";
import { getCheckboxState } from "../checkbox-utils";

describe("getCheckboxState", () => {
  it("should return all checked when all checkboxes are explicitly checked", () => {
    const result = getCheckboxState({
      userCheckedCheckboxes: { 1: true, 2: true, 3: true },
      checkboxesLength: 3,
      userIsAllChecked: false,
    });

    expect(result.isAllChecked).toBe(true);
    expect(result.getIsChecked(1)).toBe(true);
    expect(result.getIsChecked(2)).toBe(true);
    expect(result.getIsChecked(3)).toBe(true);
  });

  it("should return all checked when userIsAllChecked is true and no unchecked boxes", () => {
    const result = getCheckboxState({
      userCheckedCheckboxes: {},
      checkboxesLength: 3,
      userIsAllChecked: true,
    });

    expect(result.isAllChecked).toBe(true);
    expect(result.getIsChecked(1)).toBe(true);
    expect(result.getIsChecked(2)).toBe(true);
    expect(result.getIsChecked(3)).toBe(true);
  });

  it("should return not all checked when some checkboxes are unchecked", () => {
    const result = getCheckboxState({
      userCheckedCheckboxes: { 1: true, 2: false, 3: true },
      checkboxesLength: 3,
      userIsAllChecked: false,
    });

    expect(result.isAllChecked).toBe(false);
    expect(result.getIsChecked(1)).toBe(true);
    expect(result.getIsChecked(2)).toBe(false);
    expect(result.getIsChecked(3)).toBe(true);
  });

  it("should return not all checked when userIsAllChecked but some are explicitly unchecked", () => {
    const result = getCheckboxState({
      userCheckedCheckboxes: { 2: false },
      checkboxesLength: 3,
      userIsAllChecked: true,
    });

    expect(result.isAllChecked).toBe(false);
    expect(result.getIsChecked(1)).toBe(true);
    expect(result.getIsChecked(2)).toBe(false);
    expect(result.getIsChecked(3)).toBe(true);
  });
});
