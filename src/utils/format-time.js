export function formateDate(date) {
  const arr = date.split('T');
  const d = arr[0];
  const darr = d.split('-');

  const t = arr[1];
  const tarr = t.split('.000');
  const marr = tarr[0].split(':');

  const dd =
    parseInt(darr[0]) +
    '-' +
    parseInt(darr[1]) +
    '-' +
    parseInt(darr[2]) +
    ' ' +
    parseInt(marr[0]) +
    ':' +
    parseInt(marr[1]) +
    ':' +
    parseInt(marr[2]);
  return dd;
}

export function formateTime(date) {
  return date.split('.')[0]
}

