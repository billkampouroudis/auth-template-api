import { is } from '@bill.kampouroudis/js-utils';
import { op } from '../config/sequelize';

/**
 * Makes the convertion of each filter to the form that sequelize understands
 * @param {String} key The name of the attribute to filter (ex: id)
 * @param {*} filter The value of the filter you want to add
 * @returns
 */
const transform = (key, filter) => {
  const result = {};

  if (is.array(filter)) {
    result[key] = {};
    for (const item of filter) {
      result[key][op[item.op]] = item.value;
    }
    return result;
  }

  if (is.object(filter)) {
    result[key] = { [op[filter.op]]: filter.value };
    return result;
  }

  result[key] = filter;
  return result;
};

/**
 * In order to aply filters like 'not', 'gt', 'gte' etc.,
 * the frontend specifies those operations in a way that sequelize does not understand.
 * This function takes the filters from the request and converts them
 * to something that can be applied to a query from sequelize.
 * NOTE: When there are more than one filters in the request, they will be connected with the 'AND' operation
 * @param {object} filtersFromRequest
 * @returns {object} The object to add in the 'where' attribute of the query
 * @example
 * -- This:
 * {
 *  id: [
 *    {
 *      op: 'gt',
 *      value: 1
 *    },
 *    {
 *      op: 'lt',
 *      value: 20
 *    }
 *  ],
 *  name: 'Firstname'
 * }
 *
 * -- Will be converted to this:
 * {
 *  [op.and]: [
 *    {
 *      id: {
 *        [Op.gt]: 3,
 *        [Op.gte]: 20,
 *        [Op.lte]: 10,
 *      }
 *    },
 *    {
 *      name: 'Firstname'
 *    }
 *  ]
 * }
 */
const normalizeFilters = (filtersFromRequest = {}) => {
  const finalFilters = {};

  if (Object.keys(filtersFromRequest).length > 1) {
    finalFilters[op.and] = [];
    for (const key in filtersFromRequest) {
      const filter = filtersFromRequest[key];
      finalFilters[op.and].push(transform(key, filter));
    }
  } else {
    for (const key in filtersFromRequest) {
      const filter = filtersFromRequest[key];

      finalFilters[key] = transform(key, filter)[key];
    }
  }
  return finalFilters;
};

export default normalizeFilters;
