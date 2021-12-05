import { useState } from 'react';

export default function useCheckbox<T>(
  values: T[],
  checkboxKey: keyof T,
  defaultSelected?: T[],
) {
  // 选中项
  const [selected, setSelected] = useState<T[]>(defaultSelected ?? []);

  // 判断该选项是否被选中
  function isSelected(checkItem: T) {
    return selected.some(item => {
      return item[checkboxKey] === checkItem[checkboxKey];
    });
  }

  // 判断是否全部被选中
  function isAllSelected() {
    return values.every(item => isSelected(item));    
  }

  // 是否只有部分选项选中
  function isPartialSelected() {
    const checkHasSelected = values.some(item => isSelected(item));
    // 有一部分被选中但是又不是全部都选中
    return checkHasSelected && !isAllSelected();
  }

  // 选中全部
  function selectAll() {
    setSelected(values);
  }

  // 取消全部选中
  function unSelectAll() {
    setSelected([]);
  }

  return {
    selected,
    setSelected,
    isAllSelected,
    isPartialSelected,
    selectAll,
    unSelectAll,
    isSelected,
  }
}

