const admin = require('firebase-admin')

let serviceAccount = require('../lib/config/saehoonssss-firebase-adminsdk-7hpsn-960afd1bf4.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

exports.send = async (invite_type_id, invite_type, inviter_id, inviter_nickname, target_name, token) => {
    try {
        let message = {
            'token': token,

            'notification': {
                'title': invite_type + "invite notification",
                'body': inviter_nickname + " invited you " + invite_type + "!",
            },
            'android': {
                'notification': {
                    'clickAction': ".view.LoginActivity"
                }
            },
            'data': {
                'id': String(invite_type_id),
                'invite_type': invite_type,
                'inviter': inviter_id,
                'target_name': target_name
            }
        }

        return admin.messaging().send(message)
    } catch (err) {
        console.log(err)
        return err
    }
}