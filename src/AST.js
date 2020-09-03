import _ from 'lodash';

const getFileComparisons = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();
  const compare = allKeys.map((key) => {
    if (!_.has(object1, key)) {
      return { key, type: 'added', value: object2[key] };
    }
    if (!_.has(object2, key)) {
      return { key, type: 'delete', value: object1[key] };
    }
    if (object1[key] === object2[key]) {
      return { key, type: 'unchanged', value: object1[key] };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return { key, type: 'nested', children: getFileComparisons(object1[key], object2[key]) };
    }
    return {
      key,
      type: 'changed',
      newValue: object1[key],
      oldValue: object2[key],
    };
  });
  // console.log(JSON.stringify(compare, null, 2))
  return compare;
};
export default getFileComparisons;
