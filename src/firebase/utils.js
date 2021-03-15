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
