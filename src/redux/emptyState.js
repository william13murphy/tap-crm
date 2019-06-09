// TODO: Rename these to emptyFetchState and emptyFormPostState, since they
// are modeled after fetch vs form, and some POST's are actually fetches.
export const emptyFetchState = {
  payload: null,
  fetching: false,
};

export const emptyFormState = {
  status: null,
  payload: null,
  fetching: false,
  error: false,
};
