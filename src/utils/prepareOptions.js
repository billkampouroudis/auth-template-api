import { DEFAULT_PAGE_SIZE } from '../constants/misc';
import { safelyParseJson } from './misc';
import normalizeFilters from './normalizeFilters';

/**
 * Converts the request items to something that can be added to the "list" query
 * @param {string|number} page
 * @param {string|number} pageSize
 * @param {array} filters
 * @param {array} order
 * @returns
 */
export const prepareListOptions = (page, pageSize, filters, order, raw) => {
  const _page = parseInt(page, 10) || 1;
  const _pageSize = parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE;
  const _filters = normalizeFilters(safelyParseJson(filters));
  const _order = safelyParseJson(order) || [];
  const _raw = !!raw;

  return {
    page: _page,
    pageSize: _pageSize,
    filters: _filters,
    order: _order,
    raw: _raw
  };
};

/**
 * Converts the request items to something that can be added to the "get" query
 * @param {array} filters
 * @returns
 */
export const prepareGetOptions = (filters) => {
  const _filters = normalizeFilters(safelyParseJson(filters));

  return {
    filters: _filters
  };
};
