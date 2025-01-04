interface CheckboxState {
  userCheckedCheckboxes: Record<number, boolean | undefined>;
  checkboxesLength: number;
  userIsAllChecked: boolean;
}

interface CheckboxStateResult {
  isAllChecked: boolean;
  getIsChecked: (id: number) => boolean;
}

export function getCheckboxState({
  userCheckedCheckboxes,
  checkboxesLength,
  userIsAllChecked,
}: CheckboxState): CheckboxStateResult {
  const userCheckAllCheckboxes =
    Object.entries(userCheckedCheckboxes).filter(
      ([_, checked]) => checked === true
    ).length === checkboxesLength;

  const userUncheckSomeCheckbox = Object.entries(userCheckedCheckboxes).some(
    ([_, checked]) => checked === false
  );

  const isAllChecked =
    userCheckAllCheckboxes || (userIsAllChecked && !userUncheckSomeCheckbox);

  const getIsChecked = (id: number) =>
    userCheckedCheckboxes[id] ?? userIsAllChecked;

  return {
    isAllChecked,
    getIsChecked,
  };
}
