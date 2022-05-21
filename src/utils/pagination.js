import { is } from '@bill.kampouroudis/js-utils';
import { DEFAULT_PAGE_SIZE } from '../constants/misc';

/**
 * Adds the required for the pagination parameters to the query
 * @param {number} page
 * @param {number} pageSize
 */
export const addPagination = (page, pageSize) => {
  const pagination = {};

  if (pageSize) {
    pagination.limit = parseInt(pageSize, DEFAULT_PAGE_SIZE);
  }

  if (pagination.limit && page) {
    pagination.offset = (parseInt(page, DEFAULT_PAGE_SIZE) - 1) * pagination.limit;
  }

  return pagination;
};

/**
 * Calculates the values needed for the pagination
 * @param {number} page the page number
 * @param {number} pageSize The number of the items in each page
 * @param {number} totalResults The number of all entries in the database
 * @returns {object} An object that contains the required data for the frontend to do the pagination
 */
export const paginationValues = (page = 0, pageSize = 0, totalResults = 0) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  if (
    !is.number(page)
    || !is.number(pageSize)
    || !is.number(totalResults)
    || totalPages > totalResults
    || page > totalPages
  ) {
    return {};
  }

  let nextPage = null;
  if (page * pageSize < totalResults) {
    nextPage = page + 1;
  }

  let prevPage = null;
  if (page > 1) {
    prevPage = page - 1;
  }

  return {
    page,
    nextPage,
    prevPage,
    totalResults,
    totalPages
  };
};
