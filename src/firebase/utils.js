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

export const submitAccessibilitySettings = async (data) => {
  const decoded = jwt_decode(localStorage.getItem('token'))
  const snapshot = await fb
    .database()
    .ref(`users/${decoded.user_id}/username`)
    .get()
  const username = snapshot.val()
  await fb.database().ref(`accessibility/${username}`).update(data)
}

export const getUserAllData = async (username) => {
  // Current User
  const decoded = jwt_decode(localStorage.getItem('token'))
  const snapshot = await fb.database().ref(`users/${decoded.user_id}`).get()
  const currentUserData = await snapshot.val()

  // Get Target User's Id by it's username
  const accSnapshot = await fb.database().ref(`accessibility/${username}`).get()
  const userAccessibleData = await accSnapshot.val()

  // Get Target User's data
  const userDataSnapshot = await fb
    .database()
    .ref(`users/${userAccessibleData.user_id}`)
    .get()
  const userData = await userDataSnapshot.val()

  const output = {}
  //reading other user's userData
  if (
    userData &&
    currentUserData &&
    userData.username !== currentUserData.username
  ) {
    Object.keys(userAccessibleData).forEach((key) => {
      // Public attribute
      if (userAccessibleData[key] && key !== 'user_id') {
        output[key] = userData[key]
      }
      return { ...output, isCurrentUser: false }
    })
  } else {
    return { ...currentUserData, isCurrentUser: true }
  }
  return output
}

export const getAllUsername = async () => {
  const snapshot = await fb.database().ref('/accessibility').get()
  const data = await snapshot.val()
  return Object.keys(data)
}

export const getCurrentUsername = async () => {
  const decoded = jwt_decode(localStorage.getItem('token'))
  const snapshot = await fb
    .database()
    .ref(`users/${decoded.user_id}/username`)
    .get()
  const username = await snapshot.val()
  return username
}

export const signIn = async (email, password) => {
  await fb
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      const newToken = await Object.entries(res.user)[5][1].b
      await localStorage.setItem('token', newToken)
    })
}

export const registerToFirebase = async ({ username, email, password }) => {
  const snapshot = await fb
    .database()
    .ref('accessibility')
    .child(username)
    .get()
  if (snapshot.exists()) throw new Error('Failed. username taken')

  await fb
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      const token = await Object.entries(res.user)[5][1].b
      await localStorage.setItem('token', token)

      // store the user data
      await fb.database().ref(`users/${res.user.uid}`).set({
        email: email,
        username: username,
      })

      // store the user data accessibility with default to private
      await fb.database().ref(`accessibility/${username}`).set({
        name: false,
        user_id: res.user.uid,
        age: false,
        profile: false,
        workExperiences: false,
      })
    })
}
