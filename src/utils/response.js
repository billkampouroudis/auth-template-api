import STATUS from '../constants/statusCodes';

export const successResponse = (status, data, res, pagination) => {
  res.statusCode = status || STATUS.HTTP_200_OK;
  return {
    pagination,
    data: data || {}
  };
};

export const errorResponse = (error, res) => {
  res.statusCode = error.status || STATUS.HTTP_500_INTERNAL_SERVER_ERROR;
  return {
    error: error || {}
  };
};

/**
 * Hides the given fields from the response object
 * @param {string[]} fieldsToHide
 * @param {Object|Object[]} model The model in simple object format (use model.toJSON())
 */
export const prepareResponse = (fieldsToHide = [], model = {}) => {
  let _model;

  if (Array.isArray(model)) {
    _model = [];
    for (const item of model) {
      const _item = item.toJSON();

      for (const field of fieldsToHide) {
        delete _item[field];
        _model.push(_item);
      }
    }

    return _model;
  }

  _model = { ...model };
  for (const field of fieldsToHide) {
    delete _model[field];
  }

  return _model;
};
