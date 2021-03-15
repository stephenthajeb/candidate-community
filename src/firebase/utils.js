import fb from './firebaseConfig'
import jwt_decode from 'jwt-decode'

export const getCurrentUser = async () => {
  const token = window.localStorage.getItem('token')
  if (token) {
    const decode = jwt_decode(token)
    const user_id = decode.user_id
    const snapshot = await fb.database().ref(`users/${user_id}`).get()
    if (!snapshot.exists()) throw new Error('No data available')
    const data = await snapshot.val()
    return { ...data, user_id: user_id }
  }
  throw new Error('Session expired')
}

export const submitPersonalData = async (name, age, profile) => {
  const decoded = jwt_decode(localStorage.getItem('token'))
  const fileExtension = profile.name.slice(profile.name.lastIndexOf('.'))
  console.log(decoded, fileExtension)
  const filepath = fb.storage().ref(`users/${decoded.user_id}/profile`)
  const snapshot = await filepath.put(profile)
  const profileDownloadUrl = await snapshot.ref.getDownloadURL()
  console.log(profileDownloadUrl)

  await fb.database().ref(`users/${decoded.user_id}`).update({
    name: name,
    age: age,
    profile: profileDownloadUrl,
  })
}
