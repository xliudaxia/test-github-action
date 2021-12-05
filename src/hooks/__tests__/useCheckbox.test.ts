import useQueryCheckbox from '../useCheckbox';
import { renderHook } from '@testing-library/react-hooks';

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
});
