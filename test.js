let id = [...Array(16)].map((e) => (Math.random() * 16 | 0).toString(16)).join('')

// return MMT from node time
const getMMT = () => {
  // Get UTC time
  const time = (new Date().toUTCString().split(' ')[4].split(':'));

  const timeChange = (o, n) => (+o) + n

  // after adding GMT +6:30 but not correct
  let hr = timeChange(time[0], 6)
  let min = timeChange(time[1], 30)
  let sec = +time[2]

  // correct min and hour
  if (min > 60) {
    hr++
    min = min - 60
  }
  sec < 10 ? sec = `0${sec.toString()}` : sec.toString()
  let newMMT = [hr.toString(), min.toString(), sec].join(':')

  let newUTC = new Date().toUTCString().split(' ')
  newUTC[4] = newMMT

  console.log(newUTC.join(' '));
  return newUTC.join(' ')
}

getMMT()