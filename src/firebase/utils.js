import fb from './firebaseConfig'
import jwt_decode from 'jwt-decode'

export const submitPersonalData = async (name, age, profile) => {
  const decoded = jwt_decode(localStorage.getItem('token'))
  const filepath = fb.storage().ref(`users/${decoded.user_id}/profile`)
  const snapshot = await filepath.put(profile)
  const profileDownloadUrl = await snapshot.ref.getDownloadURL()

  await fb.database().ref(`users/${decoded.user_id}`).update({
    name: name,
    age: age,
    profile: profileDownloadUrl,
  })
}

export const submitExpData = async (data, idx) => {
  const { title, start, end, company, isStillWorking, companyLogo, desc } = data
  const decoded = jwt_decode(localStorage.getItem('token'))
  const filepath = fb.storage().ref(`users/${decoded.user_id}/exp_${idx}`)
  const snapshot = await filepath.put(companyLogo)
  const companyLogoUrl = await snapshot.ref.getDownloadURL()

  await fb
    .database()
    .ref(`users/${decoded.user_id}/workExperiences/${idx}`)
    .update({
      title: title,
      start: start,
      end: isStillWorking ? 'now' : end,
      company: company,
      companyLogo: companyLogoUrl,
      desc: desc,
    })
}

export const getUserAllData = async (username) => {
  const decoded = jwt_decode(localStorage.getItem('token'))
  const snapshot = await fb.database().ref(`users/${decoded.user_id}`).get()
  let data = snapshot.val()
  let output
  const userAccessibleData = await fb
    .database()
    .ref(`accessibility/${username}`)
    .get()
  //reading other user's userData
  if (data.username !== username) {
    data = {}
    Object.keys(userAccessibleData).forEach((key) => {
      //public atttribute
      if (userAccessibleData[key] && data[key]) {
        Object.assign(data, { key: data[key] })
      }
      output = { data: { ...data }, isCurrentUser: false }
    })
  } else {
    output = { data: { ...data }, isCurrentUser: true }
  }
  console.log(output)
  return output
}
