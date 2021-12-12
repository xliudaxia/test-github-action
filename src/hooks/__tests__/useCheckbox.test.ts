import useQueryCheckbox from '../useCheckbox';
import { renderHook, act } from '@testing-library/react-hooks';

interface MockCheckboxItemProps {
  key: string;
  value: string;
}

// 获取用于测试的默认checkbox对象列表
function generateCheckboxList(endIndx: number, startIndex = 1) {
  const defaultCheckboxList: MockCheckboxItemProps[] = [];
  for (let i = startIndex; i <= endIndx; i++) {
    defaultCheckboxList.push({
      key: `${i}`,
      value: `mock-${i}`,
    });
  }
  return defaultCheckboxList;
}

// 转换成key数组
function toKeyArray(checkboxItemList: MockCheckboxItemProps[]) {
  return checkboxItemList.map(item => item.key);
}

describe('hook useQueryCheckbox', () => {
  it('should return the total selected item', () => {
    const checkboxList = generateCheckboxList(8);
    const { result } = renderHook(() => useQueryCheckbox(checkboxList, 'key'));
    const { selected } = result.current;
    expect(selected).toEqual([]);
  });

  it('should return the total default selected item', () => {
    const checkboxList = generateCheckboxList(8);
    const { result } = renderHook(() =>
      useQueryCheckbox(checkboxList, 'key', checkboxList),
    );
    const { selected } = result.current;
    expect(selected).toEqual(checkboxList);
  });

  it('should return is all selected result', () => {
    const checkboxList = generateCheckboxList(8);
    const { result } = renderHook(() =>
      useQueryCheckbox(checkboxList, 'key', checkboxList),
    );
    const { isAllSelected: isAllSelectedFn } = result.current;
    const isAllSelected = isAllSelectedFn();
    expect(isAllSelected).toEqual(true);
  });

  it('should return is partial selected', () => {
    const checkboxList = generateCheckboxList(8);
    const partialCheckboxList = generateCheckboxList(3);
    const { result } = renderHook(() =>
      useQueryCheckbox(checkboxList, 'key', partialCheckboxList),
    );
    const { isPartialSelected: isPartialSelectedFn } = result.current;
    const isPartialSelected = isPartialSelectedFn();
    expect(isPartialSelected).toEqual(true);
  });

  it('should selected all item and return all checkbox item', () => {
    const checkboxList = generateCheckboxList(8);
    const { result } = renderHook(() => useQueryCheckbox(checkboxList, 'key'));
    act(() => {
      result.current.selectAll();
    });
    expect(toKeyArray(result.current.selected)).toEqual(
      expect.arrayContaining(toKeyArray(checkboxList)),
    );
  });

  it('should unselected all item and return empty result', () => {
    const checkboxList = generateCheckboxList(8);
    const { result } = renderHook(() =>
      useQueryCheckbox(checkboxList, 'key', checkboxList),
    );
    act(() => {
      result.current.unSelectAll();
    });
    expect(result.current.selected.length).toEqual(0);
  });


});
