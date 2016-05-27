import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

const initialState = Immutable({
  gridLayout: [
    { i: 'Flowtable', x: 1, y: 0, w: 3, h: 3 },
    { i: 'ControllerStatus', x: 4, y: 0, w: 3, h: 3 },
    { i: 'PortStatus', x: 4, y: 0, w: 3, h: 3 },
  ],
  hiddenPanel: [],
  maximumPanel: '',
});

export default handleActions({
  CHANGE_LAYOUT: (state, action) =>
    state.set('gridLayout', Immutable(action.payload)),

  TOGGLE_PANEL: (state, { payload }) => state
    .update('hiddenPanel', arr => {
      const index = arr.indexOf(payload);
      if (index !== -1) {
        return [
          ...arr.slice(0, index),
          ...arr.slice(index + 1),
        ];
      }
      return arr.concat(payload);
    }).set('maximumPanel', ''),

  MAXIMIZE_PANEL: (state, { payload }) => state
    .update('maximumPanel', str => {
      return str === payload ? '' : payload;
    }),

  RESET_LAYOUT: () => initialState,
}, initialState);