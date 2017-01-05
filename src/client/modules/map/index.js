export const putPiece = payload => (state) => {
  console.log('put piece', state, payload);
};

export default (state = {}, action) => {
  console.log('reducer', state);
  switch (action.type) {
    default: return state;
  }
};
