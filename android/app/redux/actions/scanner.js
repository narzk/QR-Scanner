import {SCANNER} from '../constants';
export function scanner(data) {
  return {
    type: SCANNER,
    payload: data,
  };
}
